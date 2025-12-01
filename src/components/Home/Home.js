import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { homeVariants, buttonVariants } from "../../utils/animationVariants";

const Home = () => {
  return (
    <AnimatePresence>
      <motion.div
        variants={homeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.content}
      >
        <motion.h1>Welcome to Todos and Tasks Home Page</motion.h1>

        <motion.p variants={homeVariants} initial="hidden" animate="visible">
          You can navigate to either one of Todos or Tasks page to add a todo or
          task.
        </motion.p>

        <div className={styles.links}>
          <Link to="todos">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              className={styles.button}
            >
              Todos Page
            </motion.button>
          </Link>

          <Link to="tasks">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              className={styles.button}
            >
              Tasks Page
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Home;
