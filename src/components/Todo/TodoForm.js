import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./TodoForm.module.css";
import { supabase } from "../../utils/supabase";
import { loadingVariants } from "../../utils/animationVariants";
import {
  validateTodoInput,
  validateTodoTitleInput,
} from "../../utils/validation";
import { UserContext } from "../../utils/userContext";

const TodoForm = () => {
  const { isUserLoggedIn } = useContext(UserContext);
  const titleRef = useRef();
  const todoRef = useRef();
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [todoError, setTodoError] = useState("");
  const [todoTitleError, setTodoTitleError] = useState("");
  const addTodoHandler = async () => {
    const titleContent = titleRef.current.value;
    const todoContent = todoRef.current.value;
    const todoTitleInputError = validateTodoTitleInput(titleContent);
    const todoInputError = validateTodoInput(todoContent);

    if (todoTitleInputError || todoInputError) {
      setTodoError(todoInputError);
      setTodoTitleError(todoTitleInputError);
      setIsAddingTodo(false);
      return;
    } else {
      setIsAddingTodo(true);

      try {
        await supabase
          .from("todos")
          .insert([{ todo_title: titleContent, todo: todoContent }])
          .select();
      } catch (error) {
        console.error(error);
      }

      setIsAddingTodo(false);
    }

    titleRef.current.value = "";
    todoRef.current.value = "";
    setTodoError("");
    setTodoTitleError("");
  };
  const titleChangeHandler = () => {
    setTodoTitleError("");
  };
  const todoChangeHandler = () => {
    setTodoError("");
  };
  return (
    <Card>
      <form>
        <h2 className={styles.title}>Add a todo</h2>
        <div className={styles.control}>
          <label htmlFor="title">Add title</label>
          <input
            disabled={!isUserLoggedIn}
            type="text"
            id="title"
            ref={titleRef}
            onChange={titleChangeHandler}
          />
          <p className={styles.error}>{todoTitleError}</p>
        </div>
        <div className={styles.control}>
          <label htmlFor="todo">Add todo</label>
          <textarea
            disabled={!isUserLoggedIn}
            cols="1"
            rows="3"
            type="text"
            id="todo"
            ref={todoRef}
            onChange={todoChangeHandler}
          ></textarea>
          <p className={styles.error}>{todoError}</p>
        </div>
        <div className={styles.actions}>
          <Button onAddHandler={addTodoHandler}>
            {isAddingTodo ? (
              <motion.span
                variants={loadingVariants}
                initial="hidden"
                animate="visible"
                className={styles.addingTodo}
              >
                Adding Todo...
              </motion.span>
            ) : (
              <span>Add Todo</span>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default TodoForm;
