import React from "react";
import styles from './TaskBoard.module.css'
import {columns} from "../../constants";
import {TaskColumn} from "../TaskColumn/TaskColumn";

export const TaskBoard = ({task,swapTaskPosition}) => {
    return <div className={styles.container}>
        {columns.map(column => <TaskColumn key={column.name} swapTaskPosition={swapTaskPosition} column={column} tasks={task.filter(tasks => tasks.type === column.marker)}/>)}
    </div>
}