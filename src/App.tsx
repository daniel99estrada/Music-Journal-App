import React, { useState, useEffect } from 'react';
import JournalEntryForm from './JournalEntryForm';
import Playlist from './Playlist';

const POSTJOURNALURL = 'https://y3trlbyznl.execute-api.us-east-1.amazonaws.com/dev/postjournal';
const POSTSPOTIFYURL = 'https://y3trlbyznl.execute-api.us-east-1.amazonaws.com/dev/postspotify';

const CLIENT_ID = "745548ae2ecf4f858ddcac85a3ba5f41";
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173/";
// const SCOPES = ["user-read-currently-playing", "user-top-read", "user-library-modify"];
const SCOPES = ["user-read-currently-playing", "user-top-read"];

// "user-library-modify"
const SCOPES_URL_PARAM = SCOPES.join("%20");

interface responseAPI {
  name: string;
}

interface Recommendation {
  tracks: Track[];
}

const response: Recommendation = {
  tracks: [
    { name: 'hello' },
    { name: 'yo' }
  ]
};

const App: React.FC = () => {
  const [recommendedTrackNames, setRecommendedTrackNames] = useState<string[]>(["yo", "yo"]);
  
  const [sentiments, setSentiments] = useState<{
    Positive: number;
    Negative: number;
    Neutral: number;
    Mixed: number;
  }>({
    Positive: 0,
    Negative: 0,
    Neutral: 0,
    Mixed: 0,
  });

  const [spotifyParams, setSpotifyParams] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Parse the URL to extract all parameters
    const params = new URLSearchParams(window.location.hash.substring(1));
    const paramsObject: { [key: string]: string } = {};
    params.forEach((value, key) => {
      paramsObject[key] = value;
    });
    setSpotifyParams(paramsObject);
    console.log(spotifyParams.access_token);

  }, []);

  const GetSpotifyData = async () => {
    const requestBody = JSON.stringify({ text: spotifyParams.access_token })
    try {
        const response = await fetch(POSTSPOTIFYURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody,
        });
        const responseData = await response.json();
        console.log('SPotify API response:', responseData);
    } catch (error) {
        console.error('Error connecting to Spotify', error);
    }
};


  const handleJournalSubmit = async (entry: string) => {
    console.log('Journal entry submitted:', entry);

    // Prepare the request body
    const requestBody = JSON.stringify({ text: entry });

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(POSTJOURNALURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      // Parse and log the response data
      const responseData = await response.json();
      console.log('API response:', responseData);
      setSentiments(responseData.sentiments);

      // You can perform any additional logic or state updates here based on the response
    } catch (error) {
      console.error('Error sending journal entry:', error);
    }

    if (spotifyParams.access_token) {
      GetSpotifyData();
    }
  };

  const handleSpotifyLogin = () => {
    const authUrl = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token`;
    window.location.href = authUrl;
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Journal App</h1>
      {spotifyParams.access_token ? (
        <div>
          <JournalEntryForm onSubmit={handleJournalSubmit} />
          <Playlist recommendedTrackNames={recommendedTrackNames} />
        </div>
      ) : (
        <button onClick={handleSpotifyLogin} className="bg-blue-500 text-white p-2 rounded">Login with Spotify</button>
      )}
    </div>
  );
}
export default App;