import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskPropsType} from "./App";

export type TodolistPropsType = {
    title: string
    tasks: TaskPropsType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
}
const Todolist = (props: TodolistPropsType) => {

        const [title, setTitle] = useState('')

        const onChangeTileHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const addTaskHandler = () => {
            props.addTask(title)
            setTitle('')
        }

        const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                addTaskHandler()
            }
        }

        const removeTaskHandler = (taskId:string) => {
            props.removeTask(taskId)
        }

        const changeFilterHandler = (filter:FilterType) => {
            props.changeFilter(filter)
        }
        return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeTileHandler}
                           onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addTaskHandler}>+
                    </button>
                </div>
                <ul>
                    {props.tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={() => {
                                    removeTaskHandler(task.id)
                                }}>x
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={()=>changeFilterHandler('all')}>All</button>
                    <button onClick={() => {changeFilterHandler('active')}}>Active</button>
                    <button onClick={() => {changeFilterHandler('completed')}}>Completed</button>
                </div>
            </div>
        );
    }
;

export default Todolist;