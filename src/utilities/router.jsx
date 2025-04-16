import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Edit from "../routes/edit.jsx";
import Add from "../routes/add.jsx";
import Contact from "../routes/contact.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/contact/:id',
        element: <Contact />
    },
    {
        path: '/add',
        element: <Add />
    },
    {
        path: '/edit/:id',
        element: <Edit />
    }
])

export default router;