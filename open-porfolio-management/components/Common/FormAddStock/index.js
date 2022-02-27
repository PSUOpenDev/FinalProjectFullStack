import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import React from 'react'

function FromAddStock({formOpen, onCloseDialog}) {
  const handleAddStock =()=> {

  }
  const handleCloseForm = () => {
    if (onCloseDialog)
    onCloseDialog(false);
  }
  return (
    <Dialog open={formOpen} >
      <DialogTitle>Add Stock</DialogTitle>
      <DialogContent>
        <DialogContentText>Add more stocks to your wishlist.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Input Stock Code"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick = {handleAddStock}>Add</Button>
        <Button onClick={handleCloseForm}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FromAddStock
