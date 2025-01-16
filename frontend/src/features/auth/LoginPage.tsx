import React from 'react'
import { Form, useNavigate } from 'react-router-dom'

import { useAppDispatch,useAppSelector } from '@/app/hooks'
// import { selectAllUsers} from '@/features/users/usersSlice'
import { useLoginMutation, useCheckAuthQuery } from './authSlice'
import {Box, Container, FormControl, Typography} from '@mui/material'
import Grid from '@mui/material/Grid2'


import { TextField, Button } from '@mui/material'

interface LoginPageFormFields extends HTMLFormControlsCollection {
    username : HTMLInputElement
    password : HTMLInputElement
}

interface LoginPageFormElements extends HTMLFormElement {
    readonly elements : LoginPageFormFields
}

export const LoginPage = () => {
    const navigate = useNavigate()
    const [login, {isLoading}] = useLoginMutation()
    const handleSubmit = async (e :React.FormEvent<LoginPageFormElements>) => {
        e.preventDefault()
        const {elements} = e.currentTarget
        const form = e.currentTarget
        const username = elements.username.value
        const password = elements.password.value
        try {
            await login({username, password}).unwrap()
            form.reset()
            console.log('Login successful')
            
            navigate('/posts')
        }
        catch (err){
            console.error('Failed to login: ', err)
            form.reset()
        }

        // console.log(username, password);
    }
    

    return (
        <Container maxWidth="sm">
            <Grid 
                container 
                spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                direction="column" 
                sx={{textAlign: 'center', marginTop : 10}}
            >
                <Box 
                component="form"  
                onSubmit = {handleSubmit}
                >
                    <Grid 
                        container
                        spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                        direction="column" 
                        sx={{textAlign: 'center'}}
                            justifyContent="center"
                    >   
                        <Grid>
                            <TextField
                            required
                            variant="outlined"
                            id="username"
                            label="Username"
                            defaultValue=""
                            />
                        </Grid>

                        <Grid>
                            <TextField
                            required
                            id="password"
                            variant="outlined"
                            label="Password"
                            type="password"
                            defaultValue=""
                            />
                        </Grid>

                        <Grid>
                            <Button variant="contained" type="submit">Login</Button>
                        </Grid>

                    </Grid>
                </Box>
                </Grid>
            {/* grid for registration */}
                <Grid 
                container 
                direction="column" 
                sx={{
                    textAlign: 'center', 
                    marginTop: 2,
                    alignItems: 'center'
                    }}
                >
                <Typography variant='body2' component="p"> Don't have an account? </Typography> 
                    <Grid size={4}>
                        <Button variant="contained" onClick = {() => navigate('/register')}>Register</Button>
                    </Grid>
            </Grid>

        </Container>
    )
}