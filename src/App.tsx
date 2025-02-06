import React from 'react';
import AppRouter from '@Routes/routes';
import { ToastContainer } from 'react-toastify'; 

function App() {
  return (
    <div>
      <ToastContainer />
      <AppRouter />
    </div>
  );
}

export default App;
