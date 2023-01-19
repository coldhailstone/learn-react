import { Outlet } from "react-router-dom";
import NavBar from './components/NavBar';
import Toast from './components/Toast';
import { useSelector, useDispatch } from 'react-redux';
import useToast from './hooks/toast';
import { useEffect, useState } from "react";
import { login } from "./store/authSlice";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
    const toasts = useSelector(state => state.toast.toasts);
    const { deleteToast } = useToast();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn')) {
            dispatch(login());
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <LoadingSpinner />
    }

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
