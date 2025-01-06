import { useNavigate } from "react-router-dom"
import {useCheckAuthQuery, useGetCurrentUserQuery, useLogoutMutation } from "@/features/auth/authSlice"
import { AppBar, Box, Button, Container, styled, Toolbar, Typography} from "@mui/material"
import Grid from '@mui/material/Grid2';
import NUSphereIconComponent from "./NUSphereIcon"



const AppBarButton = styled(Button)(({ theme }) => ({
    fontWeight: 700, // Bold font weight
    fontSize: '1rem', // 16px
    boxShadow: 'none', // Removes elevation
    backgroundColor: theme.palette.primary.main, // Default background
    color: theme.palette.common.white, // Text color
    '&:hover': {
      backgroundColor: theme.palette.primary.dark, // Custom hover color
      boxShadow: 'none', // Prevent shadow on hover
    },
  }));


export const Navbar = () => {
    const navigate = useNavigate()

    //query to check if user is authenticated
    const {
        // data : TokenRequest,
        isSuccess,
        isError,
        isFetching,
        // error
      } = useCheckAuthQuery()

      const {
        data : user
      } = useGetCurrentUserQuery();


    const [logout, {isLoading}] = useLogoutMutation()

    const onLogoutClicked = () => {
        logout()
        navigate('/login')

    }
    const onAddPostClicked = () => {
        navigate('/newPost')
    }
    
    return (
        <AppBar
        position="static"
        >
          <Container maxWidth="xl" disableGutters >
            <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NUSphereIconComponent/>
              {isSuccess ? 
              // if user is authenticated, make the NUSphere text clickable
                <Typography
                  variant="h6"
                  noWrap
                  component="p"
                  
                  onClick={() => navigate('/posts')}
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      cursor: 'pointer',
                      transform: 'scale(1.05)',
                      filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.3))',
                    },
                  }}
                >
                  NUSphere
                </Typography>  : 
                // if user is not authenticated, make the NUSphere text not clickable
                <Typography
                  variant="h6"
                  noWrap
                  component="p"
                  
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  NUSphere
                </Typography>
                }
            </Box>

            {/* space to push logout button to the right */}
            <Box sx={{ flexGrow: 1 }} />
            
            {/* render the add post and logout if the user is authenticated */}
            {isSuccess && 
            <Grid container spacing={2}>


                <AppBarButton 
                variant="contained"
                onClick={onAddPostClicked}
                >
                  New Post 
                </AppBarButton>

                <Typography 
                variant='body1' 
                component='span' 
                sx={{
                  alignContent: 'center',
                  fontWeight: 700,}}>
                  Welcome {user?.username.toUpperCase()}!
                </Typography>

                <AppBarButton 
                variant="contained" 
                onClick={onLogoutClicked}>
                  Logout
                </AppBarButton>
            </Grid>
                }

            </Toolbar>
        </Container>
    </AppBar>

    )
}
