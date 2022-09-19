import styled from "styled-components";

const Button = ({ text, type, onClick }) => {
  const types = ["basic",].includes(type)? type : "default";
  return (
    <ButtonCom
      className={["myButton", `myButton_${types}`].join(" ")}onClick={onClick}>{text}
    </ButtonCom>
  );
};

Button.defaultProps = {
  type: "default",
};
export default Button;

// 스타일드 컴포넌트
const ButtonCom = styled.button`
    padding: 5px 15px;
    color: ${(props)=>props.theme.textColor};
    background-color: ${(props)=>props.theme.HeaderColor};
    margin-right: 10px;
    line-height: 30px;
    font-size: 18px;
    border: none;
    border-radius:30px;
    &:hover{
      background-color: ${(props)=>props.theme.HeLogoColor};
      color: ${(props)=>props.theme.HeaderColor}
    }
`;
