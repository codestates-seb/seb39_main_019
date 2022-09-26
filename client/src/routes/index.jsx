<<<<<<< HEAD
import Login from "../page/Login";
import Signup from "../page/Signup";
import Main from "../page/Main";
import Post from "../page/Post";
import PostDetail from '../page/PostDetail'
import Randing from "../page/Randing";
import PuppyAuthentication from "../page/PuppyAuthentication";
import Mypage from "../page/Mypage";
import PpAuthDoneMdl from "../components/Modal/PpAuthDoneMdl";
import PpAuthFailMdl from "../components/Modal/PpAuthFailMdl";
import PpAuthOvlMdl from "../components/Modal/PpAuthOvlMdl";
=======
import Login from '../page/Login'
import SignUp from '../page/Signup'
import Main from '../page/Main'
>>>>>>> d405b30353d46620a0cbb65963260caae2979c14

const RouteModule = [
  {
    path:"/signup",
    element:<SignUp/>
  },
  {
    path:"/login",
    element:<Login/>
  }, 
  {
<<<<<<< HEAD
    path: "/main",
    element: <Main />,
  },
  {
    path: "/post",
    element: <Post />,
  },
  {
    path: "/main/:id",
    element: <PostDetail/>,
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
    path: "/mypage",
    element: <Mypage />,
  },
  {
    path: "/ppauthdonemdl",
    element: <PpAuthDoneMdl />,
  },
  {
    path: "/ppauthfailmdl",
    element: <PpAuthFailMdl />,
  },
  {
    path: "/ppauthovlmdl",
    element: <PpAuthOvlMdl />,
  },
];
=======
    path:"/",
    element:<Main/>
  }
]
>>>>>>> d405b30353d46620a0cbb65963260caae2979c14

export default RouteModule;