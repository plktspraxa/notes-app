import { Card, CardActions, CardContent, Divider } from '@mui/material'
import MKButton from 'components/MKButton'
import MKTypography from 'components/MKTypography'
import React from 'react'

const NotesCard = ({ note, setNote }) => {
  return (
    <Card 
      sx = {{
  
      }}
    >
      <CardContent>
        <MKTypography variant="h5">{note.title}</MKTypography>
        <Divider />
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