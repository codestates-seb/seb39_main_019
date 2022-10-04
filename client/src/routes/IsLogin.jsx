import useUserInfo from "../store/userinfo";

const IsLogin = () => {
  const { userId } = useUserInfo();
  console.log(userId);

  if (!userId) {
    alert("로그인 후 접근할 수 있습니다. ");
    window.location.replace("/login");
    return false;
  }
};

export default IsLogin;
