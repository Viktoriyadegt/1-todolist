import React, {useCallback} from 'react';
import './App.css';
import Todolist from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: Array<TaskPropsType>
}
export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(store=>store.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(store=>store.tasks)
    const dispatch = useDispatch()


    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todolistId,taskId))
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(AddTaskAC(todolistId, title))
    },[])

    const changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch( ChangeTaskStatusAC(todolistId, taskId, isDone))
    }, [])

    const changeFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    },[])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch((ChangeTaskTitleAC(todolistId, taskId, title)))
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    }, [])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm addTask={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todolist => {

                        return <Grid item key={todolist.id} >
                            <Paper style={{padding:'10px'}}>
                                <Todolist
                                    key={todolist.id}
                                    id={todolist.id}
                                    title={todolist.title}
                                    tasks={tasks[todolist.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={todolist.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>

            </Container>

        </div>
    );
}

export default AppWithRedux;
