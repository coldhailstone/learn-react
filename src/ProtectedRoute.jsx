import { useSelector } from 'react-redux';
import { redirect, Route } from 'react-router-dom';

function ProtectedRoute(component, path) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    if (!isLoggedIn) {
        return redirect('/');
    }

    return <Route component={component} path={path} />
}

export default ProtectedRoute;