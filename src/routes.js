import App from './App';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import AdminPage from './pages/AdminPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ShowPage from './pages/ShowPage';

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
                path: "admin",
                element: <AdminPage />,
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
                path: "blogs/:id/edit",
                element: <EditPage />,
            },
            {
                path: "blogs/:id",
                element: <ShowPage />,
            },
        ]
    },
]

export default routes;