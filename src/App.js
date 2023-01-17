import { Outlet } from "react-router-dom";
import NavBar from './components/NavBar';
import Toast from './components/Toast';
import { useSelector } from 'react-redux';
import useToast from './hooks/toast';

function App() {
    const toasts = useSelector(state => state.toast.toasts);
    const { deleteToast } = useToast();

  return (
    <>
        <NavBar />
        <Toast toasts={toasts} deleteToast={deleteToast} />
        <div className="container mt-3">
            <Outlet />
        </div>
    </>
  );
}

export default App;
