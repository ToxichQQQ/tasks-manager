import React from "react";
import styles from './TaskColumn.module.css'
import {Task} from "../index";
import {useDrop} from "react-dnd";
import {TASK_TYPE} from "../../constants/dndTypes";



export const TaskColumn = ({column,tasks,swapTaskPosition}) => {
    const [{isOver }, drop] = useDrop(() => ({
        accept: TASK_TYPE,
        drop: (item, monitor) => {
            swapTaskPosition(item,column.marker)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }),[tasks])

    return <div className={styles.column} ref={drop}>
        <div className={styles.columnHeader}>
            <h3>{column.name}</h3>
            <p>{column.description}</p>
        </div>
        <ul className={styles.taskList}>
            {tasks.map(task => <Task key={task.name} task={task}/>)}
        </ul>
    </div>
}