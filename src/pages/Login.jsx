import React from 'react';
import { Grid, Typography, TextField, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';






const Login = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState({ username: "", password: "" })
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPass, setErrorPass] = useState("");




     /////////////////////////////handle submit
     const handleSubmit = async (e) => {
        e.preventDefault();
        if (!login.username) {
            setErrorUsername("username required");
           return setTimeout(() => setErrorUsername(""), 5000)

            
        }

        else if (!login.password) {
            setErrorPass("password required");
            return setTimeout(() => setErrorPass(""), 5000)

            
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

                    <form sx={'#463B60'} onSubmit={handleSubmit}>
                    {errorUsername && <Typography variant='caption' color='error'>{errorUsername}</Typography>}
                        <TextField onChange={handleChange} value={login.username} sx={{ backgroundColor: '#fefefe', borderRadius: "5px" }} size='small' margin='dense' fullWidth type="text" id="username" label="username" variant="filled" />
                        {errorPass && <Typography variant='caption' color='error'>{errorPass}</Typography>}

                        <TextField onChange={handleChange} value={login.password} sx={{ backgroundColor: '#fefefe', marginBottom: '16px', borderRadius: "5px" }} size='small' fullWidth type="password" id="password" label="password" variant="filled" />


                        <Button type="submit" margin='dense' variant="contained" color="secondary" fullWidth>log-in</Button>

                    </form>



                </Grid>


            </Grid>

        </Container>
    )

}

export default Login;
