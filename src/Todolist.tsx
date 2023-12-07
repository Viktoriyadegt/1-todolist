import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskPropsType} from "./App";

export type TodolistPropsType = {
    title: string
    tasks: TaskPropsType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
}
const Todolist = (props: TodolistPropsType) => {

        const [title, setTitle] = useState('')
        const [error, setError] = useState<string | null>(null)

        const onChangeTileHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)

        }

        const addTaskHandler = () => {
            if (title.trim() !== '') {
                props.addTask(title.trim())
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }

        const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            setError(null)
            if (event.key === 'Enter') {
                addTaskHandler()
            }
        }

        const removeTaskHandler = (taskId: string) => {
            props.removeTask(taskId)
        }

        const changeStatusHandler = (taskId: string, isDone: boolean) => props.changeStatus(taskId, isDone)

        const changeFilterHandler = (filter: FilterType) => {
            props.changeFilter(filter)
        }

        return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           className={error ? 'error' : ''}
                           onChange={onChangeTileHandler}
                           onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addTaskHandler}>+</button>
                    {error && <div className='error-message'>{error}</div>}
                </div>
                <ul>
                    {props.tasks.map((task) => {
                        return (
                            <li key={task.id} className={task.isDone? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={(e) =>
                                           changeStatusHandler(task.id, e.currentTarget.checked)}
                                />
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
                    <button className={props.filter === 'all' ? 'active-filter' : ''}
                            onClick={() => changeFilterHandler('all')}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={() => {changeFilterHandler('active')}}>Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => {changeFilterHandler('completed')}}>Completed
                    </button>
                </div>
            </div>
        );
    }
;

export default Todolist;