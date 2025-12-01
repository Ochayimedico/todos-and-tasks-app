import { Link } from "react-router-dom";
import styles from "./ConfirmationPage.module.css";

const ConfirmationPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles["text-center"]}>Account successfully created!</h1>
      <h3 className={styles["text-center"]}>
        Please go to your mail to verify your account.
      </h3>
      <Link className={styles.link} to="/">
        Go to home
      </Link>
    </div>
  );
};
export default ConfirmationPage;
