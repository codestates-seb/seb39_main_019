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
import Kakao from "../page/Kakao";
import MypageWroteItem from "../components/Mypage/MypageWroteItem";
import PrivateRoute from "./PrivateRoute";
import IsLogin from "./IsLogin";
import useUserInfo from "../store/userinfo";
import NotFoundPage from "../page/NotFoundPage";

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
  // {
  //   path: "/mypage/*",
  //   element: <PrivateRoute authenticated={IsLogin} component={<Mypage />} />,
  // },
  {
    path: "/PuppyInfoPage",
    element: <PuppyInfoPage />,
  },
  {
    path: "/PuppyInfoPost",
    element: <PuppyInfoPost />,
  },
  {
    path: "/mypagewroteitem",
    element: <MypageWroteItem />,
  },
  {
    path: "/oauth2/login/callback/kakao",
    element: <Kakao />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
];

export default RouteModule;
