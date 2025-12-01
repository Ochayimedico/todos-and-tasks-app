import styles from "./LoginError.module.css";
const LoginError = () => {
  return (
    <div className={styles["login-error"]}>Email or password incorrect</div>
  );
};
export default LoginError;
