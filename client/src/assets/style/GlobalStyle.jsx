import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`

@font-face {
  font-family:'S_CoreDream_3Light';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff');
}
@font-face {
  font-family:'Pretendard_Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff');
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
html{
  width: 100%;
  height: 100%;
  background-color: ${(props)=>props.theme.bgColor};
  color: ${(props)=> props.theme.textColor};
  font-family: 'S_CoreDream_3Light';
}
ol,ul,li{
  list-style: none;
}
a{
  text-decoration: none;
  &:visited,
  &:link{
    color: inherit;
  }
}
button{
  cursor: pointer;
}

`



export default GlobalStyle