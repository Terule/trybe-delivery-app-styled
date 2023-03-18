import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

function UserList({ users, removeUser }) {
  const getInitials = (name) => {
    const full = name.split(' ');
    const initials = full.shift().charAt(0) + full.pop().charAt(0);
    return initials.toUpperCase();
  };
  return (
    <List sx={ { display: { md: 'none' } } }>
      {users.map((user, index) => (
        <Box key={ user.id }>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Avatar alt={ user.name } sx={ { bgcolor: 'primary.main' } }>
                {getInitials(user.name)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={ user.name }
              secondary={
                <>
                  <Typography
                    sx={ { display: 'inline' } }
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {user.email}
                  </Typography>
                  <br />

                  {user.role}
                </>
              }
            />
            <ListItemButton
              sx={ {
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                height: '76px',
              } }
            >
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={ () => removeUser(user.id) }
              >
                <DeleteIcon color="error" />
              </IconButton>
            </ListItemButton>
          </ListItem>
          {index !== users.length - 1 && <Divider variant="inset" component="li" />}
        </Box>
      ))}
    </List>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UserList;
