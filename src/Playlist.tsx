import React from 'react';

interface TrackInfo {
  name: string;
  artist: string;
  spotifyURL: string;
  imageURL: string;
}

interface PlaylistProps {
  playlistTracks?: TrackInfo[]; // Make the prop optional
}

const Playlist: React.FC<PlaylistProps> = ({ playlistTracks }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Playlist</h1>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {playlistTracks?.map((track, index) => (
          <li key={index} className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold mb-2">{track.name}</h2>
            <p className="text-gray-600 mb-2">{track.artist}</p>
            <a
              href={track.spotifyURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mb-2"
            >
              Spotify Link
            </a>
            <img src={track.imageURL} alt={track.name} className="w-full h-auto" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
