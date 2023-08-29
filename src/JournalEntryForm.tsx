import React, { useState } from 'react';

interface JournalEntryFormProps {
  onSubmit: (entry: string) => void;
}

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({ onSubmit }) => {
  const [entryText, setEntryText] = useState('');

  const handleEntryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEntryText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(entryText);
    setEntryText('');
  };

  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-semibold mb-2">Write your journal entry</h2> */}
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded-md font-main"
          rows={5}
          value={entryText}
          onChange={handleEntryChange}
          placeholder="Write your thoughts..."
        />
        <button
          className="mt-2 px-4 py-2 bg-primary text-white rounded-xl font-main"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JournalEntryForm;
