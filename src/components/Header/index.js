import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@mui/material';

import './styles.scss';


const Header = ({profile}) => {
  const [anchorEl, setAnchorEl] = useState(null);

//logica para abrir y cerrar menu de usuario
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (

    <div className='header'>
      <h1 className='logo'>ZK Roulette</h1>
      {
        !profile ?
        <div className='user-options'>
          <Button size='small' lvariant="contained" color="primary">Iniciar sesion</Button>
          <Button size='small' variant="outlined" color="primary">Crear cuenta</Button>
        </div>
        :
        <div className='user-options'>
          <Avatar alt="Z" src="/profile.jpg" onClick={handleMenuOpen} />
          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Depositar</MenuItem>
            <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Preferencias</MenuItem>
          </Menu>
        </div>
      }
    </div>
  );
};

export default Header;
