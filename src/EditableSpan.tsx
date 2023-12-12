import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return editMode
        ? <TextField variant={'outlined'}
                     value={title}
                     onBlur={activateViewMode}
                     autoFocus
                     onChange={(e) => {
                         setTitle(e.currentTarget.value)
                     }}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>


};

export default EditableSpan;