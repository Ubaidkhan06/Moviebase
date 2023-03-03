import React from 'react'
import { AppBar, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {



    return (
        <AppBar position='fixed' sx={{ backgroundColor: '#0a1f36', paddingLeft: '10px'}}>
            <Toolbar>
                <Link to='/'>
                    <img height={'60px'} width={'100px'} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="Logo" />
                </Link>
                <Link style={{textDecoration:'none', color:'inherit'}} to='/tv'><Typography variant='h6' marginLeft={3}>TV Shows</Typography></Link>
                <Link style={{textDecoration:'none', color:'inherit'}} to='/'><Typography variant='h6' marginLeft={3}>Movies</Typography></Link>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar