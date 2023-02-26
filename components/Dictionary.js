import { useState } from 'react';
import axios from 'axios';

export default function Dictionary() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    setDefinition(response.data[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={word} onChange={(event) => setWord(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      {definition && (
        <div>
          <h2>{definition.word}</h2>
          {definition.meanings.map((meaning, index) => (
            <div key={index}>
              <h3>{meaning.partOfSpeech}</h3>
              {meaning.definitions.map((def, index) => (
                <div key={index}>
                  <p>{def.definition}</p>
                  {def.example && <p>{`Example: ${def.example}`}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
