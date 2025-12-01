import { useContext } from "react";
import styles from "./Button.module.css";
import { UserContext } from "../../utils/userContext";
const Button = (props) => {
  const { isUserLoggedIn } = useContext(UserContext);
  return (
    <button
      type="button"
      className={styles.button}
      onClick={props.onAddHandler}
      disabled={!isUserLoggedIn}
    >
      {props.children}
    </button>
  );
};

export default Button;
