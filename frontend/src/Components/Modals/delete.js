import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './modal.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

export default function Delete({ delId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // Deleting an event
  const handleDelete = () => {
    try {
        fetch(`http://localhost:5000/delete/${delId}`, {
            method: "DELETE"
        }).then((res) => res.json().then(() => window.location.reload(false)))
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div>
      <button title="Delete event" className="delete" onClick={handleOpen}><DeleteOutlineIcon/></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 style={{color: 'black'}}>Are you sure you want to delete this event?</h1>
            <div className='btns'>
                <button className='del-btn' onClick={handleDelete} >Delete</button>
                <button className="cancel-btn" onClick={handleClose}>Cancel</button>
            </div>
          </div>

        </Box>
      </Modal>
    </div>
  );
}