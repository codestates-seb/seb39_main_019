import Login from '../page/Login'
import SignUp from '../page/Signup'
import Main from '../page/Main'

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
    path:"/",
    element:<Main/>
  }
]

export default RouteModule;