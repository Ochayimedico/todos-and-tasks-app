import React, { useContext, useRef, useState } from "react";
import { supabase } from "../../utils/supabase";
import { motion } from "framer-motion";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./TaskForm.module.css";
import { validateTaskInput } from "../../utils/validation";
import { loadingVariants } from "../../utils/animationVariants";
import { UserContext } from "../../utils/userContext";

const TaskForm = () => {
  const { isUserLoggedIn } = useContext(UserContext);

  const taskRef = useRef();
  const [invalidInput, setInvalidInput] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  /**
   * Handles adding a task.
   */
  const addTaskHandler = async () => {
    setIsAddingTask(true);
    const taskContent = taskRef.current.value;
    const emptyTaskInput = validateTaskInput(taskContent);

    if (emptyTaskInput) {
      setInvalidInput(emptyTaskInput);
      setIsAddingTask(false);
      return;
    } else {
      try {
        // Get the current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setInvalidInput("You must be logged in to add tasks");
          setIsAddingTask(false);
          return;
        }

        // Insert with user_id
        const { data, error } = await supabase
          .from("tasks")
          .insert([{ task: taskContent, user_id: user.id }])
          .select();

        if (error) throw error;
      } catch (error) {
        console.error("Error adding task:", error);
        setInvalidInput("Failed to add task. Please try again.");
      }
      setInvalidInput("");
      setIsAddingTask(false);
      taskRef.current.value = "";
    }
  };
  const changeHandler = () => {
    setInvalidInput("");
  };
  return (
    <Card>
      <form>
        <div className={styles.control}>
          <label htmlFor="task">Add task</label>
          <textarea
            disabled={!isUserLoggedIn}
            cols="1"
            rows="4"
            type="text"
            id="task"
            ref={taskRef}
            onChange={changeHandler}
          ></textarea>

          <p className={styles.error}>{invalidInput}</p>
        </div>
        <div className={styles.actions}>
          <Button onAddHandler={addTaskHandler}>
            {isAddingTask ? (
              <motion.span
                variants={loadingVariants}
                initial="hidden"
                animate="visible"
                className={styles.addingTask}
              >
                Adding task...
              </motion.span>
            ) : (
              <span>Add Task</span>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TaskForm;
