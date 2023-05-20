// Create a react component that inputs a textarea message then performs a fetch request to localhost:3000 gets back a response as a data.message and displays that message on a text below

import React, { Component } from 'react';

function App() {
  const [message, setMessage] = React.useState('');
  const [response, setResponse] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3002', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })

    .then((res) => res.json())
    .then((data) => setResponse(data.message))
    .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{response}</p>
    </div>
  );
  }

export default App;