import './App.css';
import {TaskBoard, TaskPanel} from "./components";
import {useCallback, useState} from "react";

export const App = () =>  {
    const [tasks, setTasks] = useState([
        {name: 'Срочный таск', description: '', type: 'asap'},
        {name: 'Сегодня таск', description: '', type: 'today'},
        {name: 'На этой неделе таск', description: '', type: 'week'},
        {name: 'В этом месяце таск', description: '', type: 'month'}
    ])

    const swapTaskPosition = useCallback((item, columnName) => {
            let currentTask = tasks.find(task => task.name === item.name)
            setTasks(prevState => [...prevState.filter(task => task.name !== item.name), {...currentTask, type: columnName}])
    },[])

    console.log(tasks)

  return <div className='container'>
      <TaskBoard task={tasks} swapTaskPosition={swapTaskPosition}/>
  </div>
}



