import React, {useState} from 'react';
import JournalEntryForm from './JournalEntryForm';
import Playlist from './Playlist';

const POSTJOURNALURL = 'https://y3trlbyznl.execute-api.us-east-1.amazonaws.com/dev/postjournal';

const App: React.FC = () => {
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
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Journal App</h1>
      <JournalEntryForm onSubmit={handleJournalSubmit} />
      <Playlist sentiments={sentiments} />
    </div>
  );
};

export default App;
