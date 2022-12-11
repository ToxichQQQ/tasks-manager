import "./App.css";
import { TaskBoard } from "./components";
import { useCallback, useEffect, useState } from "react";
import { TaskContext } from "./context";
import { AddButton } from "./components/AddButton/AddButton";
import { Modal } from "./components/Modal/Modal";
import Api from "./api";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const swapTaskPosition = useCallback(
    async (item, columnName) => {
      let currentTask = tasks.find((task) => task.name === item.name);
      setTasks((prevState) => [
        ...prevState.filter((task) => task.name !== item.name),
        { ...currentTask, type: columnName },
      ]);
      Api.updateTodo({ ...currentTask, type: columnName });
    },
    [tasks]
  );

  useEffect(() => {
    (async () => {
      const data = await Api.getTodos();
      setTasks(data || []);
    })();
  }, []);

  const addNewTask = async (task) => {
    setOpen(false);
    const taskId = await Api.addNewTodo(task);
    setTasks((prevState) => [...prevState, { ...task, id: taskId }]);
  };

  const selectTask = (task) => {
    setCurrentTask(task);
    setOpen(true);
  };

  const changeTask = async (value) => {
    setTasks((prevState) =>
      prevState.map((task) => (task.id === value.id ? value : task))
    );
    setOpen(false);
    Api.updateTodo(value);
  };

  const handleDeleteTask = async (id) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
    Api.deleteTodo(id);
    setOpen(false);
  };

  useEffect(() => {
      if (!isOpen){
         setCurrentTask(null)
      }
  },[isOpen])

  return (
    <div className="container">
      <TaskContext.Provider
        value={{
          tasks,
          setTasks,
          swapTaskPosition,
          currentTask,
          addNewTask,
          selectTask,
          changeTask,
          handleDeleteTask,
            setOpen
        }}
      >
        <TaskBoard swapTaskPosition={swapTaskPosition} />
        <AddButton setOpen={setOpen} />
        {isOpen && <Modal />}
      </TaskContext.Provider>
    </div>
  );
};
