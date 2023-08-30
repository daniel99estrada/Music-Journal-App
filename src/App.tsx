import React, { useState, useEffect } from 'react';
import JournalEntryForm from './JournalEntryForm';
import Playlist from './Playlist';
import useSpotifyAuth from './useSpotifyAuth';
import { createSpotifyPlaylist } from './assets/createPlaylist';

const POSTJOURNALURL = 'https://y3trlbyznl.execute-api.us-east-1.amazonaws.com/dev/postjournal';
const POSTSPOTIFYURL = 'https://y3trlbyznl.execute-api.us-east-1.amazonaws.com/dev/postspotify';

interface TrackInfo {
  name: string;
  artist: string;
  spotifyURL: string;
  imageURL: string;
  spotifyURI: string;
}

const App: React.FC = () => {
  const { accessToken, loginWithSpotify } = useSpotifyAuth();
  const [tracks, setTracks] = useState<TrackInfo[]>();
  const [spotifyParams, setSpotifyParams] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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

        const trackData = responseData.recommendations.tracks;
        const newTracks: TrackInfo[] = [];

        for (const track of trackData) {
          const newTrack: TrackInfo = {
            name: track.album.name,
            artist: track.album.artists[0].name,
            spotifyURL: track.album.external_urls.spotify,
            imageURL: track.album.images[0].url,
            spotifyURI: track.uri
          };
          newTracks.push(newTrack);
        }

        setTracks(newTracks);

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

      // You can perform any additional logic or state updates here based on the response
    } catch (error) {
      console.error('Error sending journal entry:', error);
    }

    if (spotifyParams.access_token) {
      setIsLoading(true); // Set loading state to true before fetching
      GetSpotifyData()
        .then(() => {
          setIsLoading(false); // Set loading state to false after fetching
        })
        .catch(() => {
          setIsLoading(false); // Handle errors and set loading state to false
        });
    }
  };

  const createSpotifyPlaylist = async (token: string) => {

    // Get the current date in the desired format: day/month.year
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

    // Prepare the request body
    const requestBody = JSON.stringify({
      name: formattedDate,
      description: 'New playlist description',
      public: false,
    });
    
    try {
      const response = await fetch('https://api.spotify.com/v1/users/smedjan/playlists', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${spotifyParams.access_token}`,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      const responseData = await response.json();
      console.log('Playlist created:', responseData);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleCreatePlaylist = async () => {
    // const id = await createSpotifyPlaylist(spotifyParams.access_token);
    // alert(id);
  }
  
  return (
    <div className="bg-tertiary min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-main mb-4 pl-4">My Journal App</h1>
        <button onClick={handleCreatePlaylist}>Add Playlist</button>
        {spotifyParams.access_token ? (
          <div>
            <JournalEntryForm onSubmit={handleJournalSubmit} />
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <>
                
                <Playlist playlistTracks={tracks} />
              </>
            )}
          </div>
        ) : (
          <button
            onClick={loginWithSpotify}
            className="bg-primary text-white font-main p-2 rounded"
          >
            Login with Spotify
          </button>
        )}
      </div>
    </div>
  );
}  

export default App;