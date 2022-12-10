import React, { useContext } from "react";
import styles from "./TaskBoard.module.css";
import { columns } from "../../constants";
import { TaskColumn } from "../TaskColumn/TaskColumn";
import { TaskContext } from "../../context";

export const TaskBoard = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div className={styles.container}>
      {columns.map((column) => (
        <TaskColumn
          key={column.name}
          column={column}
          tasks={tasks.filter((tasks) => tasks.type === column.marker)}
        />
      ))}
    </div>
  );
};
