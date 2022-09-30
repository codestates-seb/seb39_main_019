import {css} from "styled-components"

export const lightTheme = {
  bgColor : '#f6f6f6', // 기본 백그라운드
  textColor: '#2d2d2d', // 기본 텍스트 색
  HeaderColor: '#ffffff', // 헤더 배경
  HeLogoColor:'#59c8f0c5', // 헤더 로고 텍스트
  Footerbg:"#fdfdfd",
  Boder:"#ececec",
}
//'#3cd5aec5'
//#3183f7
//

export const darkTheme = {
  bgColor : '#152642',
  textColor : '#fff',
  HeaderColor:'#2F4562',
  HeLogoColor:'#ffffff',
  Footerbg:"#152642",
  Boder:"#2F4562",
}
// 원본 
// bgColor : '#131213',
// textColor : '#fff',
// HeaderColor:'#202124',
// HeLogoColor:'#ffffff',
// Footerbg:"#090809",
// Boder:"#000000",

export const phone = (e) => css`
  @media screen and (max-width: 480px){
    ${e}
  }
`

export const pad = (e) => css`
  @media screen and (max-width: 850px){
    ${e}
  }
`
