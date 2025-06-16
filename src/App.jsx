/* eslint-disable */
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Archives from "./components/Archives/Archives";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import { createHashRouter, RouterProvider } from "react-router-dom";  // 🔹 Use createHashRouter for GitHub Pages
import Layout from "./components/Layout/Layout";
import Contact from "./components/Contact/Contact";
import USerContextProvider from "./Context/UserContext";
import { Toaster } from "react-hot-toast";
import ArchiveDetails from "./components/ArchivesDetails/ArchiveDetails";

let routers = createHashRouter([
  {
    path: "",  // 🔹 Fixed incorrect property name
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "home/contact", element: <Contact /> },
      { path: "archives", element: <Archives /> },
      { path: "profile", element: <Profile /> },
      { path: "archived", element: <ArchiveDetails /> }
    ],
  },
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
]);

function App() {
  return (
    <>
      <USerContextProvider>
        <RouterProvider router={routers} />
        <Toaster />
      </USerContextProvider>
    </>
  );
}

export default App;
