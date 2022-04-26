import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Register() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [famliyName, setFamliyName] = useState("")

    const register = async () => {
        const res = await fetch('http://localhost:1000/users/register', {
            method: "post",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username, password, name, famliyName }),
            credentials: "include"
        })
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        } else {
            navigate('/login')
        }
        console.log(data);

    }

    return (
        <div>
            <div className='login'>

                <Card sx={{ height: 400, width: 365}}>
                    <CardContent sx={{ margin:1}}>

                        <TextField id="outlined-basic" label="Frist Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField id="outlined-basic" label="Famliy Name" variant="outlined" value={famliyName} onChange={(e) => setFamliyName(e.target.value)} />
                        <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />

                    </CardContent>
                    <CardActions>
                        <Button onClick={register} size="small">Register</Button>
                    </CardActions>
                    <span> Have an account? <Link to="/login">Login Now</Link></span>
                </Card>

            </div>
        </div>
    )
}
