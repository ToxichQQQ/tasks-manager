import React, { useContext } from "react";
import styles from "./Task.module.css";
import { useDrag } from "react-dnd";
import { TASK_TYPE } from "../../constants/dndTypes";
import { TaskContext } from "../../context";

export const Task = ({ task }) => {
  const { selectTask } = useContext(TaskContext);

  const [, drag] = useDrag(() => ({
    type: TASK_TYPE,
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li className={styles.task} ref={drag} onClick={() => selectTask(task)}>
      <h4>{task.name}</h4>
      <p>{task.description}</p>
    </li>
  );
};
