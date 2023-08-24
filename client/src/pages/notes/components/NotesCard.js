import { Card, CardActions, CardContent, CardHeader, Divider } from '@mui/material'
import MKButton from 'components/MKButton'
import MKTypography from 'components/MKTypography'
import React from 'react'

const NotesCard = ({ note, setNote }) => {
  return (
    <Card 
      sx = {{
  
      }}
    >
      <CardHeader title = {note.title}>
      </CardHeader>
      <CardContent>
        <MKTypography variant='body1'>{note.content}</MKTypography>
      </CardContent>
      <CardActions>
        <MKButton 
        onClick={() => { 
          setNote(note);
           }}>Edit</MKButton>
      </CardActions>
    </Card>
  )
}

export default NotesCard;