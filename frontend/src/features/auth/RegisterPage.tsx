import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "./authSlice"
import { Button, TextField } from "@mui/material"

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
            console.log('Register successful')
            navigate('/login')
        }
        catch (err){
            console.error('Failed to register: ', err)
            form.reset()
        }
    }

    return (
        <section>
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
            <Button variant="contained" type="submit">Register</Button>
            </form>
        </section>
    )
}