import React, { useState, useEffect } from 'react';

const Glossary = () => {
  const [glossary, setGlossary] = useState(() => {
    const saved = localStorage.getItem('glossary');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('glossary', JSON.stringify(glossary));
  }, [glossary]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim() && definition.trim()) {
      setGlossary([...glossary, { 
        id: Date.now(), 
        term: term.trim(), 
        definition: definition.trim() 
      }]);
      setTerm('');
      setDefinition('');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this term?')) {
      setGlossary(glossary.filter(item => item.id !== id));
    }
  };

  const filteredTerms = glossary
    .filter(item => 
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Glossary</h1>
      
      {/* Add Form */}
      <div style={{ marginBottom: '30px' }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Term"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="text"
            value={definition}
            onChange={e => setDefinition(e.target.value)}
            placeholder="Definition"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button type="submit" style={{ padding: '5px 10px' }}>
            Add Term
          </button>
        </form>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search terms..."
          style={{ padding: '5px', width: '200px' }}
        />
      </div>

      {/* Glossary List */}
      <div>
        {filteredTerms.length === 0 ? (
          <p>No terms found.</p>
        ) : (
          filteredTerms.map(item => (
            <div
              key={item.id}
              style={{
                borderBottom: '1px solid #eee',
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <strong>{item.term}:</strong> {item.definition}
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                style={{ padding: '2px 5px' }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Glossary;
