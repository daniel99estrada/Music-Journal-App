import React from 'react';

interface PlaylistProps {
  recommendedTrackNames: string[];
}

const Playlist: React.FC<PlaylistProps> = ({ recommendedTrackNames }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Recommended Tracks:</h2>
      <ul className="list-disc pl-6">
        {recommendedTrackNames.map((trackName, index) => (
          <li key={index} className="mb-2">{trackName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
