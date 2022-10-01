import Login from "../page/Login";
import Signup from "../page/Signup";
import Main from "../page/Main";
import Post from "../page/Post";
import PostDetail from "../page/PostDetail";
import Randing from "../page/Randing";
import PuppyAuthentication from "../page/PuppyAuthentication";
import Mypage from "../page/Mypage";
import PuppyInfoPage from "../page/PuppyInfoPage";
import PuppyInfoPost from "../components/Mypage/PuppyInfoPost";

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
    path: "/main/:id",
    element: <PostDetail />,
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
    path: "/mypage/*",
    element: <Mypage />,
  },
  {
    path: "/PuppyInfoPage",
    element: <PuppyInfoPage />,
  },
  {
    path: "/PuppyInfoPost",
    element: <PuppyInfoPost />,
  },
];

export default RouteModule;
