import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TaskList.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../utils/supabase";
import {
  loadingVariants,
  listItemVariants,
} from "../../utils/animationVariants";
import { UserContext } from "../../utils/userContext";
import { dateAndTimeFormat } from "../../utils/dateFormat";

const TaskList = ({ isFetchingTasks, tasks, setTasks }) => {
  const { isUserLoggedIn } = useContext(UserContext);
  const [taskDeletingState, setTaskDeletingState] = useState({});

  const deleteHandler = async (id) => {
    setTaskDeletingState((prevState) => ({ ...prevState, [id]: true }));
    try {
      await supabase.from("tasks").delete().eq("user_id", id);
      setTaskDeletingState((prevState) => ({ ...prevState, [id]: false }));
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!isUserLoggedIn ? (
        <div className={styles.link}>
          Please{" "}
          <Link to="/login" className={styles.authLinks}>
            login
          </Link>{" "}
          or{" "}
          <Link to="/register" className={styles.authLinks}>
            register
          </Link>{" "}
          an account to add a task
        </div>
      ) : (
        <section>
          <h2 className={styles.h2}>Tasks:</h2>
          {tasks.length === 0 && !isFetchingTasks ? (
            <h3 className={styles.noTasks}>No tasks available. Add a task.</h3>
          ) : (
            <div>
              {isFetchingTasks ? (
                <motion.h3
                  variants={loadingVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.loadingTasks}
                >
                  Fetching your tasks...
                </motion.h3>
              ) : (
                <ul className={styles.tasksList}>
                  <AnimatePresence>
                    {tasks.map((task, i) => {
                      const isDeleting = taskDeletingState[task.id] || false;
                      return (
                        <motion.li
                          className={styles.list}
                          layout
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          custom={i}
                          key={task.id}
                        >
                          <div className={styles.container}>
                            <div className={styles.content}>
                              <p className={styles.text}>{task.task}</p>
                              <div className={styles.buttonContent}>
                                <button
                                  type="button"
                                  onClick={() => deleteHandler(task.id)}
                                  disabled={isDeleting}
                                  className={styles.deleteButton}
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                              </div>
                            </div>
                            <div className={styles.date_and_time}>
                              <i>{dateAndTimeFormat(task.created_at)}</i>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default TaskList;
