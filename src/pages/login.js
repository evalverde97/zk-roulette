import React, { useEffect } from 'react';
import { FormControl, TextField } from '@mui/material';

// app.listen(port, () => console.log('connected correctly to port ' + port));




const Login = () => {
  
  return (
  <div>
    <h1>Login</h1>
    <FormControl>
        <TextField
          id="login-user"
          label="User"
        />
        <TextField
          id="login-password"
          label="Password"
          type="password"
          InputAdornment="password"
        />
    </FormControl>
  </div>
  );
}

export default Login;
