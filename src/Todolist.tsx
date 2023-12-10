import React from 'react';
import {FilterType, TaskPropsType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskPropsType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle:(todolistId:string, title:string)=>void
}
const Todolist = (props: TodolistPropsType) => {


        const removeTaskHandler = (taskId: string) => {
            props.removeTask(props.id, taskId)
        }

        const changeStatusHandler = (taskId: string, isDone: boolean) => props.changeStatus(props.id, taskId, isDone)

        const changeFilterHandler = (filter: FilterType) => {
            props.changeFilter(props.id, filter)
        }

        const addTask = (title: string) => props.addTask(props.id, title)

        const removeTodolistHandler = () => props.removeTodolist(props.id)

        return (
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={(title)=>props.changeTodolistTitle(props.id, title)}/>
                    <button onClick={removeTodolistHandler}>x</button>
                </h3>

                <AddItemForm addTask={addTask}/>
                <ul>
                    {props.tasks.map((task) => {
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={(e) =>
                                           changeStatusHandler(task.id, e.currentTarget.checked)}
                                />
                                <EditableSpan title={task.title}
                                              onChange={(title) => {
                                                  props.changeTaskTitle(props.id, task.id, title)
                                              }}/>
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
                            onClick={() => {
                                changeFilterHandler('active')
                            }}>Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => {
                            changeFilterHandler('completed')
                        }}>Completed
                    </button>
                </div>
            </div>
        );
    }
;

export default Todolist;