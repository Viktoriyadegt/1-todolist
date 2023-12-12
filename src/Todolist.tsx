import React from 'react';
import {FilterType, TaskPropsType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    changeTodolistTitle: (todolistId: string, title: string) => void
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
                    <EditableSpan title={props.title} onChange={(title) => props.changeTodolistTitle(props.id, title)}/>
                    <IconButton onClick={removeTodolistHandler}>
                        <Delete/>
                    </IconButton>
                </h3>

                <AddItemForm addTask={addTask}/>
                <div>
                    {props.tasks.map((task) => {
                        return (
                            <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox color={'primary'}
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
                                <IconButton onClick={() => {
                                    removeTaskHandler(task.id)
                                }}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Button variant={props.filter === 'all' ? 'outlined' : 'text'} color={'inherit'}
                            onClick={() => changeFilterHandler('all')}>All
                    </Button>
                    <Button variant={props.filter === 'active' ? 'outlined' : 'text'} color={'primary'}
                            onClick={() => {
                                changeFilterHandler('active')
                            }}>Active
                    </Button>
                    <Button
                        variant={props.filter === 'completed' ? 'outlined' : 'text'} color={'secondary'}
                        onClick={() => {
                            changeFilterHandler('completed')
                        }}>Completed
                    </Button>
                </div>
            </div>
        );
    }
;

export default Todolist;