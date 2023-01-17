import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Route } from "react-router-dom";
import routes from './routes';
import './index.css';
import { store } from './store'
import { Provider } from 'react-redux'
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
