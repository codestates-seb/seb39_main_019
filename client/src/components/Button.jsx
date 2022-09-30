import styled from "styled-components";

const Button = ({ text, type, onClick }) => {
  const types = [
    "basic",
    "auth",
    "mypage",
    "mypageBtn",
    "add",
    "delete",
    "cancel",
  ].includes(type)
    ? type
    : "default";
  return (
    <ButtonCom
      className={["myButton", `myButton_${types}`].join(" ")}
      onClick={onClick}
    >
      {text}
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
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.HeaderColor};
  margin-right: 10px;
  line-height: 30px;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  &:hover {
    background-color: ${(props) => props.theme.HeLogoColor};
    color: ${(props) => props.theme.HeaderColor};
  }

  &.myButton_auth {
    padding: 12px 24px;
    margin: 2px 0 20px 0;
    width: 100%;
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    letter-spacing: 1px;
    border: 0;
    border-bottom: 2px solid #4dafd2c5;
    transition: all 0.15s ease;
    background: #59c8f0c5;
    border-radius: 5px;
    text-shadow: 1px 1px 0 rgba(39, 110, 204, 0.5);

    &:hover {
      background: #4dafd2c5;
    }
    &:focus {
      outline: 0;
    }
  }

  &.myButton_mypage {
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    color: ${(props) => props.theme.HeaderColor};
    background-color: ${(props) => props.theme.HeLogoColor};
    border-bottom: 2px solid #4dafd2c5;
    border-right: 2px solid #4dafd2c5;
    transition: all 0.15s ease;
    border-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.HeaderColor};
      color: ${(props) => props.theme.textColor};
      transform: scale(1.05);
    }
  }

  &.myButton_mypageBtn {
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    color: ${(props) => props.theme.HeaderColor};
    background-color: ${(props) => props.theme.HeLogoColor};
    border-bottom: 2px solid #4dafd2c5;
    border-right: 2px solid #4dafd2c5;
    transition: all 0.15s ease;
    border-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.HeaderColor};
      color: ${(props) => props.theme.textColor};
      transform: scale(1.05);
    }
  }

  &.myButton_add {
    /* width: 100%; */
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    color: ${(props) => props.theme.HeaderColor};

    background-color: ${(props) => props.theme.HeLogoColor};

    transition: all 0.15s ease;
    border-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.HeaderColor};
      color: ${(props) => props.theme.textColor};
      transform: scale(1.05);
    }
  }
  &.myButton_cancel {
    /* width: 100%; */
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    color: ${(props) => props.theme.HeaderColor};

    background-color: ${(props) => props.theme.HeLogoColor2};

    transition: all 0.15s ease;
    border-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.HeaderColor};
      color: ${(props) => props.theme.textColor};
      transform: scale(1.05);
    }
  }

  &.myButton_delete {
    /* width: 100%; */
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    /* color: ${(props) => props.theme.HeaderColor}; */

    /* background-color: ${(props) => props.theme.HeLogoColor}; */
    background-color: red;
    /* border-bottom: 2px solid #4dafd2c5;
    border-right: 2px solid #4dafd2c5; */
    transition: all 0.15s ease;
    border-radius: 5px;

    &:hover {
      /* background-color: ${(props) => props.theme.HeaderColor}; */
      background-color: red;
      /* color: ${(props) => props.theme.textColor}; */
      transform: scale(1.05);
    }
  }
`;
