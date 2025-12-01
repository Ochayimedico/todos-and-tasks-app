import { Outlet } from "react-router-dom";
import { UserContext } from "../../utils/userContext";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Navbar from "./Navbar";
import styles from "./RootLayout.module.css";
import { motion } from "framer-motion";

function RootLayout() {
  /**
   * Renders the layout component for the application.
   * Sets up the user context and handles user authentication.
   * Renders the navigation bar and the main content of the application.
   */
  const [username, setUsername] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setIsUserLoggedIn(true);
      } else if (event === "SIGNED_OUT") {
        setIsUserLoggedIn(false);
      }
    });

    // Unsubscribe on cleanup
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const userMetadata = async () => {
    if (isUserLoggedIn) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        let { username } = user.user_metadata;
        if (username) {
          // Extract and capitalize the first word
          const words = username.split(" ");
          if (words.length > 0) {
            const firstWord = words[0];
            username =
              firstWord.charAt(0).toUpperCase() +
              firstWord.slice(1).toLowerCase();
          } else {
            username = null;
          }

          setUsername(username);
        } else {
          setUsername(null);
          return;
        }
      } catch (error) {
        console.error("Error fetching user metadata:", error);
      }
    } else {
      return;
    }
  };

  const ctxValue = { username, userMetadata, isUserLoggedIn };

  return (
    <UserContext.Provider value={ctxValue}>
      <Navbar />
      <motion.main className={styles.main}>
        <Outlet />
      </motion.main>
    </UserContext.Provider>
  );
}

export default RootLayout;
