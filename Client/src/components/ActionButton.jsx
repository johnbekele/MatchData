// Components/ActionButton.jsx
import React, { useState } from 'react';
import { 
  Button, 
  Menu, 
  MenuItem, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ActionButton = ({ row, onAction }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    if (action === 'view') {
      setDialogType('view');
      setDialogOpen(true);
    } else if (action === 'delete') {
      setDialogType('delete');
      setDialogOpen(true);
    } else {
      onAction(action, row);
    }
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogType('');
  };

  const handleConfirmDelete = () => {
    onAction('delete', row);
    handleDialogClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon />
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleAction('view')}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleAction('edit')}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleAction('delete')} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* View Dialog */}
      <Dialog open={dialogOpen && dialogType === 'view'} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>PDF Details</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <Typography variant="subtitle2" color="textSecondary">PDF Name:</Typography>
              <Typography variant="body1">{row.pdfName}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" color="textSecondary">Question:</Typography>
              <Typography variant="body1">{row.pdfQuestion}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" color="textSecondary">Answer:</Typography>
              <Typography variant="body1">{row.pdfAnswer}</Typography>
            </div>
            <div className="flex gap-4">
              <div>
                <Typography variant="subtitle2" color="textSecondary">Wiki Status:</Typography>
                <span className={`px-2 py-1 rounded text-sm ${
                  row.wiki === 'found' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {row.wiki === 'found' ? 'Found' : 'Not Found'}
                </span>
              </div>
              <div>
                <Typography variant="subtitle2" color="textSecondary">TRsite Status:</Typography>
                <span className={`px-2 py-1 rounded text-sm ${
                  row.trsite === 'found' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {row.trsite === 'found' ? 'Found' : 'Not Found'}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen && dialogType === 'delete'} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{row.pdfName}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionButton;