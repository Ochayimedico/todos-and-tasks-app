// import Card from "../UI/Card";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";
import Navbar from "./Navbar";
function ErrorPage() {
  return (
    <>
      <Navbar />
      <main className={styles.content}>
        <h2> This page does not exist. Please check the link and try again.</h2>
        <Link to="..">
          <h3>Go to Homepage</h3>
        </Link>
      </main>
    </>
  );
}

export default ErrorPage;
