import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addTask: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm called')
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
        if(error!==null){
            setError(null)
        }
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    return (
        <div>
            <TextField variant={'outlined'}
                       value={title}
                       error={!!error}
                       onChange={onChangeTileHandler}
                       onKeyPress={onKeyPressHandler}
                       label={'Title'}
                       helperText={error}
            />
            <IconButton
                    color={'primary'}
                    onClick={addTaskHandler}>
                    <AddBox/>
            </IconButton>
        </div>
    );
})

export default AddItemForm;