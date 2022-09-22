import Login from "../page/Login";
import Signup from "../page/Signup";
import Main from "../page/Main";
import Post from "../page/Post";
import Randing from "../page/Randing";
import SocialSuccess from "../page/SocialSuccess";
import PuppyAuthentication from "../page/PuppyAuthentication";

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
    path: "/socialsuccess",
    element: <SocialSuccess />,
  },
  {
    path: "/puppyauthentication",
    element: <PuppyAuthentication />,
  },
];

export default RouteModule;
