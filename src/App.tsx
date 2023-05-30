import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { router } from 'router';
import 'App.css';

const App = () => {
  useEffect(() => {
    const audio = document.querySelector('audio');
    document.addEventListener(
      'click',
      () => {
        if (audio) {
          audio.volume = 0.05;
          audio.play();
        }
      },
      { once: true }
    );
  }, []);

  return (
    <>
      <audio autoPlay loop>
        <source src="/Assets/Music/Waterflame%20-%20Glorious%20Morning%20Extended.mp3" type="audio/mpeg" />
      </audio>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
