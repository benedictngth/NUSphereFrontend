import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch,useAppSelector } from '@/app/hooks'
// import { selectAllUsers} from '@/features/users/usersSlice'
import { useLoginMutation, useCheckAuthQuery } from './authSlice'



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
        <section>
            <h2>Login</h2>
            <form onSubmit = {handleSubmit}>
                    <TextField
                    required
                    variant="outlined"
                    id="username"
                    label="Username"
                    defaultValue=""
                    />

                    <TextField
                    required
                    id="password"
                    variant="outlined"
                    label="Password"
                    defaultValue=""
                    />
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </section>
    )
}