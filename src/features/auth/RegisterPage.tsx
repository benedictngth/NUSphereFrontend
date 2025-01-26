import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "./authSlice"
import { Box, Button, TextField, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'

interface RegisterPageFormFields extends HTMLFormControlsCollection {
    username : HTMLInputElement
    password : HTMLInputElement
}

interface RegisterPageFormElements extends HTMLFormElement {
    readonly elements : RegisterPageFormFields
}

export const RegisterPage = () => {
    const navigate = useNavigate()
    const [register, {isLoading}] = useRegisterMutation()
    const handleSubmit = async (e :React.FormEvent<RegisterPageFormElements>) => {
        e.preventDefault()
        const {elements} = e.currentTarget
        const form = e.currentTarget
        const username = elements.username.value
        const password = elements.password.value
        try {
            await register({username, password}).unwrap()
            form.reset()
            // console.log('Register successful')
            navigate('/login')
        }
        catch (err){
            console.error('Failed to register: ', err)
            form.reset()
        }
    }

    return (
            <Box 
            component="form" 
            onSubmit = {handleSubmit}>

             <Grid 
                container
                spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                direction="column" 
                sx={{textAlign: 'center'}}
                    justifyContent="center"
                    marginTop = {10}
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
                        <Button variant="contained" type="submit">Register</Button>

                        <Typography variant="body2" sx={{marginTop: 2}}>Already have an account? <Link 
                            to="/login"
                            >Login
                            </Link>
                        </Typography>
                        <Typography variant="body2" sx={{marginTop: 2}}>Min <b>6</b> character password required.
                        </Typography>
                     </Grid>
            </Grid>
            </Box>
    )
}