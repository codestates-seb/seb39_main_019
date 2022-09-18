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

@font-face {
    font-family: 'yg_jalnan';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff%27') format('woff');
    font-weight: normal;
    font-style: normal;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  letter-spacing: -0.3px;
}
body,
html{
  width: 100%;
  height: 100%;
  background-color: ${(props)=>props.theme.bgColor};
  color: ${(props)=> props.theme.textColor};
  font-family: 'S_CoreDream_3Light';

  transition: 0.3s;

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