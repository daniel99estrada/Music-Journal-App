// spotifyApi.ts

import axios, { AxiosError } from 'axios';

interface SpotifyUserProfile {
  id: string;
  // Other properties from the response...
}

export async function getUserId(accessToken: string): Promise<string | null> {
    const url = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
  
    try {
      const response = await axios.get<SpotifyUserProfile>(url, { headers });
  
      if (response.status === 200) {
        return response.data.id;
      } else {
        console.error('Error fetching user ID:', response.statusText);
        return null;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error fetching user ID:', axiosError.message);
      return null;
    }
  }

  interface SpotifyPlaylistResponse {
    id: string;
    // Other properties from the response...
  }
  
  export async function createSpotifyPlaylist(accessToken: string): Promise<string | null> {
    const userId = await getUserId(accessToken);
  
    if (!userId) {
      console.error('Failed to get user ID.');
      return null;
    }
  
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
  
    const playlistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const playlistRequestBody = {
      name: formattedDate,
      description: 'New playlist description',
      public: false,
    };
  
    try {
      const response = await axios.post<SpotifyPlaylistResponse>(playlistUrl, playlistRequestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        console.log('Playlist created successfully.');
        return response.data.id; // Return the playlist ID
      } else {
        console.error('Error creating playlist:', response.statusText);
        return null;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error creating playlist:', axiosError.message);
      return null;
    }
  }