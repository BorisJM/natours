import { useEffect, useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    async function getReviews() {
      const res = await fetch('http://127.0.0.1:8000/my-reviews');
      const data = await res.json();
      setMessage(data.status);
    }
    getReviews();
  }, []);

  return <h1>React app {message}</h1>;
}
