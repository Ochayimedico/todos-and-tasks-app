import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styles from "./Todo.module.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  addSuccessVariants,
  linksVariants,
} from "../../utils/animationVariants";
import AddSuccess from "../States/AddSuccess";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [isFetchingTodos, setIsFetchingTodos] = useState(false);
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  useEffect(() => {
    // Fetching Initial Todos
    setIsFetchingTodos(true);
    const fetchTodos = async () => {
      try {
        let { data: todos, error } = await supabase
          .from("todos")
          .select("user_id, todo_title, todo, created_at");
        if (todos) {
          setIsFetchingTodos(false);
          setTodos(todos);
        } else if (error) {
          throw new Error("error loading todos", error.message);
        }
      } catch (error) {
        throw new Error("Error fetching todos", error);
      }
    };
    fetchTodos();
    // Subscribe to real-time updates for the "todos" table
    const todosSubscription = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            // Handle new todo insertion
            setTodos((prevTodos) => [...prevTodos, payload.new]);
            setNewTodoAdded(true);
          } else if (payload.eventType === "DELETE") {
            // Handle todo deletion
            setTodos((prevTodos) =>
              prevTodos.filter((todo) => todo.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
    return () => {
      todosSubscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (newTodoAdded) {
      const timeoutId = setTimeout(() => {
        setNewTodoAdded(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [newTodoAdded]);
  return (
    <>
      <AnimatePresence>
        {newTodoAdded && (
          <motion.div
            variants={addSuccessVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <AddSuccess />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.container}>
        <motion.div
          variants={linksVariants}
          initial="hidden"
          animate="visible"
          className={styles.todoContent}
        >
          <div>
            <TodoForm />
            <TodoList
              todos={todos}
              isFetchingTodos={isFetchingTodos}
              setTodos={setTodos}
            />
          </div>
          )
        </motion.div>
      </div>
    </>
  );
};
export default Todo;
