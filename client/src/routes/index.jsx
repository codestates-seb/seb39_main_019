import Login from '../page/Login'
import Signup from '../page/Signup'
import Main from '../page/Main'
import Post from '../page/Post'

const RouteModule = [
  {
    path:"/signup",
    element: <Signup/>
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/",
    element: <Main/>
  },
  {
    path:"/post",
    element: <Post/>
  }
]

export default RouteModule;