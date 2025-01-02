import React from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch,useAppSelector } from '@/app/hooks'
import { UserIcon } from './UserIcon'
import { Typography } from '@mui/material'
import AppBar from './AppBarMUI'
import { useNavigate } from 'react-router-dom'

import { useLogoutMutation, useCheckAuthQuery, TokenRequest } from '@/features/auth/authSlice'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    data : TokenRequest,
    isError,
    error
  } = useCheckAuthQuery()
  const [logout, {isLoading}] = useLogoutMutation()

  
  let navContent : React.ReactNode=null
  if (TokenRequest === "authSuccess") {
    const onLogoutClicked = () => {
      logout()
      navigate('/login')

    }
    const navContent = (
      <div className = "navContent">
        <div className="navLinks">
          <Link to="/posts">Posts</Link>
        </div>
        <div className = "userDetails">
          <UserIcon size={32} />
          <button className="button small" onClick={onLogoutClicked}>Logout</button>
        </div>
      </div>
    )
  return (
    <nav>
      <section>
        <Typography variant="h1" component="h1">NUSphere</Typography>
        {navContent}
      </section>
    </nav>
  )
}

return (
  <AppBar />
)
}
