import { Autocomplete, Fab, Grid, TextField } from '@mui/material';
import MKBox from 'components/MKBox';
import NavBar from 'pages/components/NavBar';
import NotesCard from 'pages/notes/components/NotesCard';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import { notesApi } from 'shared/services/notesApi';
import NoteModal from './components/NoteModal';
import Masonry from '@mui/lab/Masonry';

const Notes = () => {
    const [state, setState] = useState({
        showForm: false,
        note: {
            title: "",
            content: "",
        },
        notes: [],
        newNote: false
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
            showForm: true,
            newNote: false
        })
    }

    const getNotes = async () => {
        console.log("Iam fetch calling");
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
        if (state.showForm == false) {
            getNotes();
        }
    }, [state.showForm])

    return (
        <MKBox>
            <NavBar>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item container xs={12} justifyContent="center" alignItems="center" >
                        <Grid item xs={6}>
                            <Autocomplete
                                id="searchBar"
                                disableClearable
                                options={state.notes?.map((note, index) => ({ id: index, label: note.title }))}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search notes"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                                onChange={(e, note) => {
                                    setNote(state.notes[note.id]);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={11}>
                        <Masonry columns={4} spacing={2}>
                            {
                                state?.notes?.map((note) => (
                                        <NotesCard note={note} setNote={setNote} />
                                ))
                            }
                        </Masonry>
                    </Grid>
                </Grid>
                <NoteModal show={state.showForm} setShow={setShow} note={state.note} newNote={state.newNote} />
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: "absolute",
                        top: 15,
                        right: 20
                    }}
                    onClick={() => {
                        setState({
                            ...state,
                            showForm: true,
                            newNote: true,
                            note: {
                                title: "",
                                content: ""
                            }
                        })
                    }}
                >
                    <AddIcon />
                </Fab>
            </NavBar>
        </MKBox >
    )
}

export default Notes;