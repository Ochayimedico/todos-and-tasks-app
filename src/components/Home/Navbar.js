import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

import { supabase } from "../../utils/supabase";
import { motion } from "framer-motion";
import { navVariants } from "../../utils/animationVariants";
import { useContext } from "react";
import { UserContext } from "../../utils/userContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { username, userMetadata, isUserLoggedIn } = useContext(UserContext);

  const logoutHandler = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.log("logout error", error);
    }
  };
  userMetadata();
  return (
    <header className={styles.header}>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={styles.content}
      >
        <div className={styles["home-and-links"]}>
          <NavLink to="/">
            <motion.h3>Todos & Tasks App</motion.h3>
          </NavLink>

          <div className={styles.links}>
            <li>
              <NavLink
                to="/todos"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Tasks
              </NavLink>
            </li>
          </div>
        </div>
        <div className={styles.auth}>
          {!isUserLoggedIn && (
            <li className={styles["login-link"]}>
              <NavLink
                to="/login"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
          )}

          {!isUserLoggedIn && (
            <li>
              <NavLink
                to="/register"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Register
              </NavLink>
            </li>
          )}

          {isUserLoggedIn && username && (
            <div className={styles.username}>Hi, {username} </div>
          )}
          {isUserLoggedIn && (
            <li onClick={logoutHandler} className={styles["logout-button"]}>
              Logout
            </li>
          )}
        </div>
      </motion.nav>
    </header>
  );
};
export default Navbar;
