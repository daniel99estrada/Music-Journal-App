import { useEffect } from 'react';
import { useState } from 'react';

const CLIENT_ID = "745548ae2ecf4f858ddcac85a3ba5f41";
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPES = ["user-read-currently-playing", "user-top-read", "user-library-modify"];
// const SCOPES = ["user-read-currently-playing", "user-top-read"];

"user-library-modify"
const SCOPES_URL_PARAM = SCOPES.join("%20");



interface SpotifyAuth {
  accessToken: string | null;
  loginWithSpotify: () => void;
}

const useSpotifyAuth = (): SpotifyAuth => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleSpotifyLogin = () => {
    const REDIRECT_URL_AFTER_LOGIN  = `${window.location.origin}/`;
    const authUrl = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token`;
    window.location.href = authUrl;
  };

  // Check for access token in URL hash on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return { accessToken, loginWithSpotify: handleSpotifyLogin };
};

export default useSpotifyAuth;
