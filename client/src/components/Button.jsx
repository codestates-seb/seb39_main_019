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
  padding: 5px 20px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #6AC6FC;
  font-family: S_CoreDream_3Light;
  color: #6AC6FC;
  font-weight: 600;
  font-size: 18px;
`;
