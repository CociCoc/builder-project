import  {createBrowserRouter} from "react-router-dom";
import App from "../App"
import Home from "../pages/Home"
import CreateShopData from "../createShopData";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/home", element: <Home /> },
            { path: "create-shop-data", element: <CreateShopData /> },

        ]
    }
]);