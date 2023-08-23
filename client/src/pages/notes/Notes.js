
import { Grid } from '@mui/material';
import MKBox from 'components/MKBox';
import NavBar from 'pages/components/NavBar';
import NotesCard from 'pages/notes/components/NotesCard';

import React, { useEffect, useState } from 'react'
import { notesApi } from 'shared/services/notesApi';
import SimpleModal from './components/SimpleModal';


const Notes = () => {
    const [state, setState] = useState({
        showForm: false,
        note: {
            title: "",
            content: ""
        },
        notes: []
    });

    const setShow = (show) => {
        setState({
            ...state,
            showForm: show
        })
    }

    const setNote = (note) => {
        setState({
            ...state,
            note: note,
            showForm: true
        })
    }

    const getNotes = async () => {
        const response = await notesApi.readAll();
        const body = await response.json();
        console.log(body);
        setState({
            ...state,
            notes: body.notes
        });
        return body.notes;
    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <MKBox>
            <NavBar>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        state?.notes?.map((note) => (
                            <Grid item xs={2} key={note._id}>
                                <NotesCard note = {note} setNote = {setNote}/>
                            </Grid>
                        ))
                    }
                </Grid>
                <SimpleModal show={state.showForm} setShow={setShow} note={state.note} />
            </NavBar>
        </MKBox >
    )
}

export default Notes;