
import './App.css';
import RouterApp from './RouterApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <RouterApp />
      <ToastContainer autoClose={3000} position='top-right' />
    </>
  );
}

export default App;
