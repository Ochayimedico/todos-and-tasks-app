import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./TodoList.module.css";
import { supabase } from "../../utils/supabase";
import {
  loadingVariants,
  listItemVariants,
} from "../../utils/animationVariants";
import { UserContext } from "../../utils/userContext";
import { dateAndTimeFormat } from "../../utils/dateFormat";

const TodoList = ({ todos, isFetchingTodos, setTodos }) => {
  const { isUserLoggedIn } = useContext(UserContext);
  const [todoDeletingState, setTodoDeletingState] = useState({});

  const deleteHandler = async (id) => {
    setTodoDeletingState({ ...todoDeletingState, [id]: true });
    try {
      await supabase.from("todos").delete().eq("id", id);
      setTodoDeletingState({ ...todoDeletingState, [id]: false });
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      throw new Error(error);
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
          an account to add a todo
        </div>
      ) : (
        <section>
          <h2 className={styles.h2}>Todos:</h2>
          {todos.length === 0 && !isFetchingTodos ? (
            <h3 className={styles.noTodos}>No todos available. Add a todo.</h3>
          ) : (
            <div>
              {isFetchingTodos ? (
                <motion.h3
                  variants={loadingVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.loadingTodos}
                >
                  Fetching your todos...
                </motion.h3>
              ) : (
                <ul className={styles.todoList}>
                  <AnimatePresence>
                    {todos.map((list, i) => {
                      const isDeleting = todoDeletingState[list.id] || false;
                      return (
                        <motion.li
                          className={styles.list}
                          layout
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          exit="exit"
                          key={list.id}
                        >
                          <div className={styles.container}>
                            <div className={styles.content}>
                              <div className={styles.textContent}>
                                <h4>{list.todo_title}</h4>
                                <p>{list.todo}</p>
                              </div>

                              <div className={styles.buttonContent}>
                                <button
                                  type="button"
                                  onClick={() => deleteHandler(list.id)}
                                  disabled={isDeleting}
                                  className={styles.deleteButton}
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                              </div>
                            </div>
                            <div className={styles.date_and_time}>
                              <i>{dateAndTimeFormat(list.created_at)}</i>
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
export default TodoList;
