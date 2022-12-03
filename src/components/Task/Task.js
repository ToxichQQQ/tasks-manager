import React from "react";
import styles from './Task.module.css'
import {useDrag} from "react-dnd";
import {TASK_TYPE} from "../../constants/dndTypes";

export const Task = ({task}) => {
    const [{isDragging},drag] = useDrag(() => ({
        type: TASK_TYPE,
        item: task,
       collect: (monitor => ({
           isDragging: !!monitor.isDragging()
       }))
    }))

    return <li className={styles.task} ref={drag}>
        <h4>{task.name}</h4>
        <p>{task.description}</p>
    </li>
}