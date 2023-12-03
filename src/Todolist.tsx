import React from 'react';
import {FilterType, TaskPropsType} from "./App";

export type TodolistPropsType = {
    title: string
    tasks: TaskPropsType[]
    removeTask: (taskId:number)=>void
    changeFilter: (filter: FilterType)=>void
}
const Todolist = (props: TodolistPropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={(e)=>{props.removeTask(task.id)}}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;