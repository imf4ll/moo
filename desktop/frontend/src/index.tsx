import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Player } from './pages/Player';

import './styles/global.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Player />,
    }
]);

createRoot(document.querySelector('#root')!).render(
    <>
        <ToastContainer />

        <RouterProvider router={ router } />
    </>
);
