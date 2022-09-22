import Login from "../page/Login";
import Signup from "../page/Signup";
import Main from "../page/Main";
import Post from "../page/Post";
import Randing from "../page/Randing";
import PuppyAuthentication from "../page/PuppyAuthentication";
import PuppyInfo from "../page/PuppyInfo";

const RouteModule = [
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/post",
    element: <Post />,
  },
  {
    path: "/",
    element: <Randing />,
  },
  {
    path: "/puppyauthentication",
    element: <PuppyAuthentication />,
  },
  {
    path: "/puppyinfo",
    element: <PuppyInfo />,
  },
];

export default RouteModule;
