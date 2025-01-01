import React from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch,useAppSelector } from '@/app/hooks'
import { userLoggedOut } from '@/features/auth/authSlice'
import { UserIcon } from './UserIcon'
import { selectCurrentUser } from '@/features/users/usersSlice'
import { Typography } from '@mui/material'
import AppBar from './AppBarMUI'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const isLoggedIn = !!user // !! converts user to a boolean
  console.log(isLoggedIn)
  let navContent : React.ReactNode=null
  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(userLoggedOut())
    }
    const navContent = (
      <div className = "navContent">
        <div className="navLinks">
          <Link to="/">Posts</Link>
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
