import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../utils/supabase";
import {
  validateLoginEmail,
  validateLoginPassword,
} from "../../utils/validation";
import { loadingVariants, linksVariants } from "../../utils/animationVariants";
import Card from "../UI/Card";
import AuthButton from "../UI/AuthButton";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import LoginError from "../States/LoginError";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const loginHandler = async () => {
    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;

    const emailError = validateLoginEmail(emailInput);
    const passwordError = validateLoginPassword(passwordInput);

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }
    setIsLoading(true);

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });

      if (data.user) {
        setIsLoading(false);
        navigate("/");
      }
      if (!data.user) {
        setIsLoading(false);
        setLoginError(true);

        return;
      } else if (error) {
        console.error("Error, could not log in.", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
    } finally {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setEmailError("");
      setPasswordError("");
    }
  };
  const emailChangeHandler = () => {
    setEmailError("");
    setLoginError(false);
  };
  const passwordChangeHandler = () => {
    setPasswordError("");
    setLoginError(false);
  };

  return (
    <motion.div
      variants={linksVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      {loginError && <LoginError />}
      <Card>
        <form onSubmit={submitHandler}>
          <h2 className={styles.title}>Login to your account</h2>
          <div className={styles.control}>
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              onChange={emailChangeHandler}
            />
            <p className={styles.error}>{emailError}</p>
          </div>

          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              onChange={passwordChangeHandler}
            />
            <p className={styles.error}>{passwordError}</p>
          </div>

          <div className={styles.actions}>
            <AuthButton onAddHandler={loginHandler}>
              {isLoading ? (
                <motion.span
                  variants={loadingVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.loggingIn}
                >
                  Logging in...
                </motion.span>
              ) : (
                "Login"
              )}
            </AuthButton>
          </div>
        </form>
      </Card>
      <div className={styles.link}>
        New user?{" "}
        <Link to="/register" className={styles.authLinks}>
          Click to register an account
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
