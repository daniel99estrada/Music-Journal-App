import React from 'react';

interface PlaylistProps {
  sentiments: {
    Positive: number;
    Negative: number;
    Neutral: number;
    Mixed: number;
  };
}

const Playlist: React.FC<PlaylistProps> = ({ sentiments }) => {
  return (
    <div>
      <h2>Sentiments</h2>
      <ul>
        {Object.entries(sentiments).map(([sentiment, percentage]) => (
          <li key={sentiment}>
            {sentiment}: {percentage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
