import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


/////////////=========== Page for Admin edit and delete vacations==============///////////////

export default function AdminCard({ vaca, setUpdate1 }) {


    const [descriptions, setDescriptions] = useState("");
    const [country, setCountry] = useState("");
    const [cityName, setCityName] = useState("");
    const [price, setPrice] = useState();
    const [img, setImg] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateUntil, setDateUntil] = useState("");
    const [msg, setmsg] = useState("");

    const delvacations = async () => {
        const res = await fetch(`http://localhost:1000/admin/${vaca.id}`, {
            method: "DELETE",
            headers: { 'content-type': 'application/json; charset=UTF-8' },
            credentials: "include"
        });
        setUpdate1(true)
    }


    const editvacation = async () => {
        const res1 = await fetch('http://localhost:1000/admin', {
            method: "put",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: vaca.id, descriptions, country, cityName, price, img, dateFrom, dateUntil }),
            credentials: "include"
        })
        const data1 = await res1.json()
        if (data1.err) {
            setmsg(data1.err)
        } else {
            setUpdate1((up) => !up)
        }

        console.log(data1);
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


        <>
            <Card className="card" sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={vaca.img}
                    alt={vaca.cityName}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {vaca.cityName}, {vaca.country}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {new Date(vaca.dateFrom).toLocaleDateString('he-IL')} - {new Date(vaca.dateUntil).toLocaleDateString('he-IL')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {vaca.descriptions}
                    </Typography>
                    <div className='pricefollowers'>
                        <Typography variant="h5">
                            ${vaca.price}
                        </Typography>
                        <EditIcon id="editpan" onClick={handleClick} />
                        <DeleteForeverIcon id="deletepen" onClick={delvacations} />
                    </div>
                </CardContent>

            </Card>


            <Box sx={{ '& > :not(style)': { m: 1 }, }}>



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
                <span className='msg'>{msg}</span>
                    <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={vaca.img.toString()} label="Img" variant="outlined" size="small" onChange={e => setImg(e.target.value)} />
                    <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={vaca.country.toString()} label="Country" variant="outlined" size="small" onChange={e => setCountry(e.target.value)} />
                    <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={vaca.cityName.toString()} label="City" variant="outlined" size="small" onChange={e => setCityName(e.target.value)} />
                    <TextField sx={{ m: 0.5 }} type="date" id="outlined-basic"  variant="standard" onChange={e => setDateFrom(e.target.value)} />
                    <TextField sx={{ m: 0.5 }} type="date" id="outlined-basic"  variant="standard" onChange={e => setDateUntil(e.target.value)} />
                    <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={vaca.descriptions.toString()} label="Descriptions" variant="outlined" size="small" onChange={e => setDescriptions(e.target.value)} />
                    <TextField sx={{ m: 0.5 }} id="outlined-basic" placeholder={vaca.price.toString()} label="Price" variant="outlined" size="small" onChange={e => setPrice(e.target.value)} />
                    <Button id="btnvava" variant="contained" onClick={editvacation}>Edit Vacation</Button>
                </Popover>

            </Box>
        </>
    )
}
