import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';





const Login = () => {
    const navigate = useNavigate();


    ////////////////////////////////////state

    const [login, setLogin] = useState({ username: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");


    ///////<----------------------->///////


    /////////////////////////////handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!login.username) {
            setErrorMsg("username required");
           return setTimeout(() => setErrorMsg(""), 5000)

            
        }

        else if (!login.password) {
            setErrorMsg("password required");
            return setTimeout(() => setErrorMsg(""), 5000)

            
        }

        let data = {};
        axios.get('http://localhost:8000/api/admin/'+ login.username)
        .then(res => data = res.data)
        .catch(err => setErrorMsg(err));

        if(!data ||  data.password !== login.password){
            setErrorMsg("username or password is incorrect");
            setTimeout(() => setErrorMsg(""), 5000);
            return
        }
        navigate("/home/transaction")
        setLogin({username: "", password: ""})
    }

    ///////<----------------------->///////



    ///////////////////////////handle change

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.id;
        setLogin({ ...login, [name]: value })
        console.log(login);
    }


    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            color="primary.main"
            minHeight={'100vh'}
            backgroundColor="primary.main"
        >


            <Grid
                color="primary"
                container
                style={{ color: "#fefefe" }}
            >
                <Grid item xs={1} />
                <Grid item xs={12} md={3}>
                    <Typography variant="h4" fontWeight={100} gutterBottom marginLeft={"-1vw"} component='h3'>
                        Welcome to
                    </Typography>
                    <Typography variant="h1" marginLeft={"7vw"} fontWeight={400} component='h1'>
                        up<Typography color="secondary" display="inline" variant="h1">CASH</Typography>
                    </Typography>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={12} md={5} borderRadius={3} backgroundColor="primary.light" padding={3}   >

                    <form onSubmit={handleSubmit}>

                        {errorMsg ? <Typography variant='caption' color='error'>{errorMsg}</Typography> : null}

                        <TextField onChange={handleChange} value={login.username} sx={{ backgroundColor: '#fefefe', borderRadius: "5px" }} size='small' margin='dense' fullWidth type="text" id="username" label="username" variant="filled" />

                        <TextField onChange={handleChange} value={login.password} sx={{ backgroundColor: '#fefefe', marginBottom: '16px', borderRadius: "5px" }} size='small' fullWidth type="password" id="password" label="password" variant="filled" />


                        <Button
                            type="submit" margin='dense' variant="contained" color="secondary" fullWidth>log-in</Button>
                    </form>



                </Grid>
                <Grid item xs={1} />


            </Grid>

        </Grid>
    )

}

export default Login;