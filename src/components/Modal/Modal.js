import React, { useContext, useState } from "react";
import styles from "./Modal.module.css";
import { TaskContext } from "../../context";
import { taskTypes } from "../../constants";

export const Modal = () => {
  const { currentTask, addNewTask, changeTask, handleDeleteTask } =
    useContext(TaskContext);
  const [taskName, setTaskName] = useState(currentTask?.name || "");
  const [description, setDescription] = useState(
    currentTask?.description || ""
  );
  const [taskType, setTaskType] = useState(currentTask?.type || "today");

  return (
    <div className={styles.modal}>
      <p>
        Дата создания:{" "}
        {currentTask?.data || new Date().toLocaleDateString("ru-RU")}
      </p>
      <input
        className={styles.input}
        placeholder="Название таска"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      {!currentTask && (
        <select
          className={styles.select}
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
        >
          {taskTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      )}
      <textarea
        className={styles.textArea}
        placeholder="Описание..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div
        className={
          currentTask ? styles.buttonsContainer : styles.buttonContainer
        }
      >
        <button
          className={styles.button}
          onClick={
            currentTask
              ? () => {
                  changeTask({ ...currentTask, description, name: taskName });
                  setTaskType("");
                  setDescription("");
                }
              : () => {
                  addNewTask({
                    name: taskName,
                    description,
                    type: taskType,
                    date: new Date().toLocaleDateString("ru-RU"),
                  });
                  setDescription("");
                  setTaskName("");
                }
          }
        >
          Сохранить
        </button>
        {currentTask && (
          <button
            className={styles.button}
            onClick={() => handleDeleteTask(currentTask.id)}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};
