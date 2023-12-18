import React, {useCallback} from 'react';
import {FilterType, TaskPropsType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Task from "./Task";

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
const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('todolist called')

    const changeFilterHandler = useCallback((filter: FilterType) => {
        props.changeFilter(props.id, filter)
    }, [props.changeFilter, props.id])

    const addTask = useCallback((title: string) => props.addTask(props.id, title), [props.addTask, props.id])

    const removeTodolistHandler = () => props.removeTodolist(props.id)

    let taskForTodolist = props.tasks

    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(t => t.isDone)
    }

    const onChangeTodolistTitleHandler = useCallback((title:string) =>
        props.changeTodolistTitle(props.id, title), [props.changeTodolistTitle, props.id])


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addTask={addTask}/>
            <div>
                {taskForTodolist.map((task) => {

                    return (
                        <Task key={task.id}
                              todolistId={props.id}
                              task={task}
                              removeTask={props.removeTask}
                              changeTaskTitle={props.changeTaskTitle}
                              changeStatus={props.changeStatus}/>
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
})


export default Todolist;