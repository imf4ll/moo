import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Home } from './pages/Home';
import { Settings } from './pages/Settings';

import './styles/global.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    }, 
    {
        path: "/settings",
        element: <Settings />
    },
]);

createRoot(document.querySelector('#root')!).render(
    <>
        <ToastContainer />

        <RouterProvider router={ router } />
    </>
);
