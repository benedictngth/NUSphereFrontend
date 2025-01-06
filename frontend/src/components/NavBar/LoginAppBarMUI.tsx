import { useNavigate } from "react-router-dom"
import {useLogoutMutation } from "@/features/auth/authSlice"
import { Link } from "react-router-dom"
import { UserIcon } from "../UserIcon"
import { Typography } from "@mui/material"




export const LoginAppBarMUI = () => {
    const navigate = useNavigate()
    const [logout, {isLoading}] = useLogoutMutation()

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
