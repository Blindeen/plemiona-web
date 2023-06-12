import { RouterProvider } from 'react-router-dom';
import { useRef } from 'react';

import { router } from 'router';
import 'App.css';

const App = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
    }
  };

  return (
    <>
      <audio ref={audioRef} onCanPlayThrough={handleAudio} autoPlay loop>
        <source src="/Assets/Music/Waterflame%20-%20Glorious%20Morning%20Extended.mp3" type="audio/mpeg" />
      </audio>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
