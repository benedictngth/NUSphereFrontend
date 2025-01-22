import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Box } from '@mui/material'

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        NUSphere
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2, 
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Container maxWidth="xl">
        {/* <Typography 
      variant="body1"
      color="white">
        My sticky footer can be found here.
      </Typography> */}
        <Copyright />
      </Container>
    </Box>
  )
}
