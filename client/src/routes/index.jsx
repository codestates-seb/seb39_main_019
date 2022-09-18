import Login from '../page/Login'
import Signup from '../page/Signup'
import Main from '../page/Main'

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
]

export default RouteModule;