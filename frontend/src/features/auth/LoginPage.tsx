import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch,useAppSelector } from '@/app/hooks'
import { selectAllUsers} from '@/features/users/usersSlice'


import {userLoggedIn} from './authSlice'

interface LoginPageFormFields extends HTMLFormControlsCollection {
    username : HTMLInputElement
}

interface LoginPageFormElements extends HTMLFormElement {
    readonly elements : LoginPageFormFields
}

export const LoginPage = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectAllUsers)
    const navigate = useNavigate()

    const handleSubmit = (e :React.FormEvent<LoginPageFormElements>) => {
        e.preventDefault()
        const {elements} = e.currentTarget
        const username = elements.username.value
        dispatch(userLoggedIn(username))
        navigate('/')
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Login</h2>
            <form onSubmit = {handleSubmit}>
                <label htmlFor="username">Username:</label>
                <select id="username" required>
                    {userOptions}
                </select>
                <button>Login</button>
            </form>
        </section>
    )
}