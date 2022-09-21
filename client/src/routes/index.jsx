import Login from "../page/Login";
import Signup from "../page/Signup";
import Main from "../page/Main";
import Post from "../page/Post";
import Randing from "../page/Randing";
import KakaoLogin from "../page/KakaoLogin";

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
    path: "/kakaologin",
    element: <KakaoLogin />,
  },
];

export default RouteModule;
