import styles from "./AddSuccess.module.css";
import successIcon from "../../pics/success-icon.png";
const AddSuccess = () => {
  return (
    <div className={styles.addSuccess}>
      <div className={styles.messageAndImg}>
        <div className={styles.successIcon}>
          <img src={successIcon} alt="success icon" />
        </div>
        <p className={styles.message}>Successfully added</p>{" "}
      </div>
    </div>
  );
};
export default AddSuccess;
