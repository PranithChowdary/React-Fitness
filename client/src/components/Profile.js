import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Avatar } from '@mui/material';

function Profile({ user, onUpdateUser }) {
  const [editing, setEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      await onUpdateUser(formData);
      alert("Avatar updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Failed to update avatar.");
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      {!editing ? (
        <>
          <Typography variant="h6">Profile</Typography>
          <Avatar alt="User Avatar" src={user.avatarUrl} sx={{ width: 56, height: 56, my: 2 }} />
          <Typography variant="body1">Name: {user.name}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Button variant="contained" color="primary" onClick={() => setEditing(true)} sx={{ mt: 2 }}>
            Edit Profile
          </Button>
        </>
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h6">Update Profile</Typography>
          <TextField
            type="file"
            onChange={handleFileChange}
            sx={{ my: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Update Avatar
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setEditing(false)} sx={{ mt: 2 }}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Profile;
