import React from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import { useReducer} from "react";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";

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

function AppWithReducers() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasks(RemoveTaskAC(todolistId,taskId))
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        dispatchTasks(AddTaskAC(todolistId, title))
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks( ChangeTaskStatusAC(todolistId, taskId, isDone))
    }

    const changeFilter = (todolistId: string, filter: FilterType) => {
        dispatchTodolists(ChangeTodolistFilterAC(todolistId, filter))
    }

    const removeTodolist = (todolistId: string) => {
        dispatchTodolists(RemoveTodolistAC(todolistId))
        dispatchTasks(RemoveTodolistAC(todolistId))
    }

    const addTodolist = (title: string) => {
       dispatchTodolists(AddTodolistAC(title))
        dispatchTasks(AddTodolistAC(title))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks((ChangeTaskTitleAC(todolistId, taskId, title)))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolists(ChangeTodolistTitleAC(todolistId, title))
    }


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
                <Grid container style={{padding:'20px       '}}>
                    <AddItemForm addTask={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        let taskForTodolist = tasks[todolist.id]
                        if (todolist.filter === 'active') {
                            taskForTodolist = taskForTodolist.filter(t => !t.isDone)
                        }
                        if (todolist.filter === 'completed') {
                            taskForTodolist = taskForTodolist.filter(t => t.isDone)
                        }
                        return <Grid item>
                            <Paper style={{padding:'10px'}}>
                                <Todolist
                                    key={todolist.id}
                                    id={todolist.id}
                                    title={todolist.title}
                                    tasks={taskForTodolist}
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

export default AppWithReducers;
