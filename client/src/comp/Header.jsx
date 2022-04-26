import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header() {

    const navigate = useNavigate()

    const logout = async () => {
        const res = await fetch('http://localhost:1000/users/logout', {
            method: "delete",
            credentials: "include"
        })
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        } else {
            localStorage.removeItem('username')
            localStorage.removeItem('role')
            localStorage.removeItem('id')
            navigate('/login')
        }
        console.log(data);

    }

    const goTo = (des) => {
        navigate('/' + des)
    }

    return (
        <div className='header'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ bgcolor: '#ff8a80' }}>
                    <Toolbar>
                        <Typography id="headr" onClick={() => goTo("")} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Vacations
                        </Typography>

                        {
                            !localStorage.username ?
                                <>
                                    <Button onClick={() => goTo("login")} color="inherit">Login</Button>
                                    <Button onClick={() => goTo("register")} color="inherit">Register</Button>
                                </>
                                :
                                <>
                                    <Typography >
                                        Hey {localStorage.username} 😉
                                    </Typography>
                                    {
                                        localStorage.role == "admin" ?
                                            <>
                                                <Button onClick={() => goTo("chart")} color="inherit">Chart</Button>
                                            </>
                                            :
                                            <>
                                            </>

                                    }
                                    <Button onClick={logout} color="inherit">Logout</Button>
                                </>
                        }

                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}
