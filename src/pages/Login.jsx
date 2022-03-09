import React from 'react';
import { Grid, Typography, Paper, TextField, FormControl } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Button from '@mui/material/Button';






const Login = () =>{

    const [login, setLogin] = useState({username: "", password: ""})

    const handleSubmit =(e)=>{
        e.preventDefault();
       
        console.log(login);
        setLogin({username: "", password: ""})
    }

    const handleChange = (e) =>{
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.id;
        setLogin({...login, [name]: value})
        console.log(login);
    }
    

return(
<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  color= "primary.main"
  minHeight={'100vh'}
  backgroundColor="primary.main"
>
 

    <Grid
    color="primary"
    container
    style={{color: "#fefefe"}}
>
    <Grid item xs={1} />
    <Grid item xs={12}  md={3}>
        <Typography variant="h4" fontWeight={100} gutterBottom marginLeft={"-1vw"} component='h3'>
            Welcome to
            </Typography>
            <Typography variant="h1" marginLeft={"7vw"} fontWeight={400} component='h1'>
            up<Typography color="secondary" display="inline" variant="h1">CASH</Typography>
            </Typography>
  </Grid>
  <Grid item xs={2} />

  <Grid item xs={12}  md={5} borderRadius={3} backgroundColor="primary.light" padding={3}   >

   <form onSubmit={handleSubmit}>
           <TextField onChange={handleChange} value={login.username}  sx={{backgroundColor: '#fefefe', borderRadius: "5px"}} size='small' margin='dense'  fullWidth type="text" id="username" label="username" variant="filled" />
 
           <TextField onChange={handleChange} value={login.password} sx={{backgroundColor: '#fefefe', marginBottom: '16px', borderRadius: "5px"}}  size='small'   fullWidth type="password" id="password" label="password" variant="filled" />
     
     
       <Button type="submit" margin='dense' variant= "contained" color="secondary" fullWidth>log-in</Button>

   </form>

    

  </Grid>
  <Grid item xs={1} />

 
    </Grid>

</Grid>
)

}

export default Login;
