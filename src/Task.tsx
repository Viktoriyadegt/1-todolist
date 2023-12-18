import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskPropsType} from "./AppWithRedux";


export type TaskType = {
    todolistId: string
    task: TaskPropsType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}
const Task = React.memo((props: TaskType) => {

    const removeTaskHandler = () => {
        props.removeTask(props.todolistId, props.task.id)
    }

    const changeTaskTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
    }, [props.changeTaskTitle, props.todolistId, props.task.id])

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }

    return (
        <div className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox color={'primary'}
                      checked={props.task.isDone}
                      onChange={changeTaskStatusHandler}
            />
            <EditableSpan title={props.task.title}
                          onChange={changeTaskTitleHandler}/>
            <button onClick={removeTaskHandler}>x
            </button>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
})

export default Task;