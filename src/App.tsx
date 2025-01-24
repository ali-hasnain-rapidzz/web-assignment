import AppRouter from './routes/routes';
import { ToastContainer } from 'react-toastify';  // Import the ToastContainer

function App() {
  return <div>
    <ToastContainer/>
    <AppRouter />
    </div>;
}

export default App;
