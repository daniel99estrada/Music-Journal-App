import React from 'react';

interface TrackInfo {
  name: string;
  artist: string;
  spotifyURL: string;
  imageURL: string;
  spotifyURI: string;
}

interface PlaylistProps {
  playlistTracks?: TrackInfo[]; // Make the prop optional
}

const Playlist: React.FC<PlaylistProps> = ({ playlistTracks }) => {
  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-main mb-4">Playlist</h1>
      <ul className="space-y-4">
        {playlistTracks?.map((track, index) => (
          <li key={index} className="flex items-center space-x-4 bg-secondary rounded- border-2 border-black p-4">
            <img src={track.imageURL} alt={track.name} className="w-16 h-auto" />
            <div>
              <h2 className="text-xl font-main">{track.name}</h2>
              <p className="text-gray-600 font-main">{track.artist}</p>
              <a
                href={track.spotifyURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline block font-main"
              >
                Spotify Link
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
