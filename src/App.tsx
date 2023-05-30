import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { router } from 'router';
import 'App.css';

const App = () => {
  const audioListener = () => {
    const audio = document.querySelector('audio');
    if (audio) {
      audio.volume = 0.05;
      audio.play();
    }
  };

  useEffect(() => {
    document.addEventListener(
      'click',
      audioListener,
      { once: true },
    );
    return () => document.removeEventListener('click', audioListener, false);
  }, []);

  return (
    <>
      <audio autoPlay loop>
        <source src='/Assets/Music/Waterflame%20-%20Glorious%20Morning%20Extended.mp3' type='audio/mpeg' />
      </audio>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
