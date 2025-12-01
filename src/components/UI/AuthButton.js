import styles from "./AuthButton.module.css";
const AuthButton = (props) => {
  return (
    <button
      type="submit"
      className={styles.button}
      onClick={props.onAddHandler}
    >
      {props.children}
    </button>
  );
};

export default AuthButton;
