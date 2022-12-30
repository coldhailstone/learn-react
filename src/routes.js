import App from './App';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
        {
            path: "",
            element: <HomePage />,
        },
        {
            path: "blogs",
            element: <ListPage />,
        },
        {
            path: "blogs/create",
            element: <CreatePage />,
        },
        {
            path: "blogs/edit",
            element: <EditPage />,
        },
        ]
    },
]

export default routes;