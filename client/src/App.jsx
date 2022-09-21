import React from "react";
import useStore from "./store/globalStore";
import RouteModule from "./routes";
import GlobalStyle from "./assets/style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./assets/style/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { isLight,setIsLight } = useStore();
  const theme = isLight === false?  darkTheme :lightTheme 
  
  React.useEffect(()=>{
    if(localStorage.getItem('theme')==='light'){
      return
    }else{
      setIsLight()
    }
  },[])
   

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          {RouteModule.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
