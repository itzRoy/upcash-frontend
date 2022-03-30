import React from 'react';
import { Grid, Typography, TextField, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios'


const Login = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState({ username: "", password: "" })
    const [errorMsg, setErrorMsg] = useState('');
    



    /////////////////////////////handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!login.username) {
            setErrorMsg("username required");
            setTimeout(() => setErrorMsg(""), 5000)

            return
        }

        else if (!login.password) {
            setErrorMsg("password required");
            setTimeout(() => setErrorMsg(""), 5000)

            return
        }

        let data = new FormData();
        data.append('username', login.username)
        data.append('password', login.password)

         axios.post('login', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('admin', res.data.admin.username)
                console.log(res.data);
            })
            .then(()=>{
                setLogin({ username: "", password: "" })
                navigate("/transactions")
            })
            .catch(err => err.message == "Request failed with status code 401"? setErrorMsg("invalid username/password"): setErrorMsg("server error"));

       

    }



    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.id;
        setLogin({ ...login, [name]: value })
        console.log(login);
    }


    return (
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }} maxWidth={'xl'}>



            <Grid
                spacing={2}
                color="primary"
                container
                style={{ color: "#fefefe" }}
            >
                <Grid item xl={6} md={6} xs={12} align={'center'} textAlign={'left'}>
                    <Typography variant="h4" fontWeight={100} align={'inherit'} >
                        Welcome to
                    </Typography>
                    <Typography variant="h1" fontWeight={400} component='div' align={'center'}>
                        up<Typography color="secondary" display="inline" variant="h1" component='h3'>CASH</Typography>
                    </Typography>
                </Grid>

                <Grid item xl={6} md={6} xs={12} borderRadius={3} backgroundColor="primary.light"  >
                    {errorMsg && <Typography variant='caption' color='error'>{errorMsg}</Typography>}

                    <form sx={'#463B60'} onSubmit={handleSubmit}>
                        <TextField onChange={handleChange} value={login.username} sx={{ backgroundColor: '#fefefe', borderRadius: "5px" }} size='small' margin='dense' fullWidth type="text" id="username" label="username" variant="filled" />

                        <TextField onChange={handleChange} value={login.password} sx={{ backgroundColor: '#fefefe', marginBottom: '16px', borderRadius: "5px" }} size='small' fullWidth type="password" id="password" label="password" variant="filled" />


                        <Button type="submit" margin='dense' variant="contained" color="secondary" fullWidth>log-in</Button>

                    </form>



                </Grid>


            </Grid>

        </Container>
    )

}

export default Login
