import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Admin({ setVacations, vacations }) {

    const [update, setUpdate] = useState(false);
    const [descriptions, setDescriptions] = useState("");
    const [country, setCountry] = useState("");
    const [cityName, setCityName] = useState("");
    const [price, setPrice] = useState();
    const [img, setImg] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateUntil, setDateUntil] = useState("");

    const addVacation = async () => {
        const res = await fetch('http://localhost:1000/admin', {
            method: "post",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ descriptions, country, cityName, price, img, dateFrom, dateUntil }),
            credentials: "include"
        })
        const data = await res.json()

        if (data.err) {
            alert(data.err)
        } else {
            setVacations([...vacations, { descriptions, country, cityName, price, img, dateFrom, dateUntil }])
            setUpdate(upd => !upd)
        }
        console.log(data);

    }


    /// for the popover////
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // end of popover


    return (

        <div>
            <div className='addPost'>

                <Box sx={{ '& > :not(style)': { m: 1 } }}>

                    <Fab color='primary' aria-label="add" onClick={handleClick} sx={{ bgcolor: '#ff8a80' }}>
                        <AddIcon />
                    </Fab>
                    

                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >

                            <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={img} label="Img" variant="outlined" size="small" onChange={e => setImg(e.target.value)} />
                            <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={country} label="Country" variant="outlined" size="small" onChange={e => setCountry(e.target.value)} />
                            <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={cityName} label="City" variant="outlined" size="small" onChange={e => setCityName(e.target.value)} />
                            <TextField sx={{ m: 0.5 }} type="date" id="outlined-basic" variant="standard" onChange={e => setDateFrom(e.target.value)} />
                            <TextField sx={{ m: 0.5 }} type="date" id="outlined-basic" variant="standard" onChange={e => setDateUntil(e.target.value)} />
                            <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={descriptions} label="Descriptions" variant="outlined" size="small" onChange={e => setDescriptions(e.target.value)} />
                            <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={price} label="Price" variant="outlined" size="small" onChange={e => setPrice(e.target.value)} />
                            <Button id="btnvava" variant="contained" onClick={addVacation}>Add Vacations</Button>

                            
                        </Popover>

                    
                </Box>
            </div>
        </div>
    )
}
