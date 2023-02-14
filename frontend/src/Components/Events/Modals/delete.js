import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './modal.css'
import { SINGLE_EVENT, tokenHeader } from '../../../Constants/Events/constants';

export default function Delete({ delId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // Deleting an event
  const handleDelete = () => {
        axios.delete(SINGLE_EVENT(delId), {
            headers: tokenHeader
        }).then((res) => {
          if(res.data.error){
            console.log(res.data.error)
          }
          window.location.reload(false)
        })
  }

  return (
    <div>
      <button title="Delete event" className="delete" onClick={handleOpen}><DeleteOutlineIcon/></button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className='modal-box delete-box'>
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