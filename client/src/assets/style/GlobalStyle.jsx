<<<<<<< HEAD
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family:'S_CoreDream_3Light';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff');
}
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KOTRAHOPE';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/KOTRAHOPE.woff2') format('woff2');
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
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
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

.instructions > svg {
    margin-right: 0.25rem;
}

.offscreen {
    position: absolute;
    left: -9999px;
}

.hide {
    display: none;
}

.valid {
    color: limegreen;
    margin-left: 0.25rem;
}

.invalid {
    color: red;
    margin-left: 0.25rem;
}

`;

export default GlobalStyle;
=======
>>>>>>> d405b30353d46620a0cbb65963260caae2979c14
