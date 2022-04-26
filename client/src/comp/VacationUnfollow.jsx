import { useState } from 'react';
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';

// the compentent show the vacation that the user is not following follow//////////

export default function VacationsCard({ vacaunfollow, setUpdate }) {

    const [checked, setChecked] = useState(false);



    const addfollow = async () => {
        const res = await fetch('http://localhost:1000/vacations/addfollow', {
            method: "post",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ user_id: localStorage.id, vacations_id: vacaunfollow.id }),
            credentials: "include"
        })
        toggleChecked()
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        } else {
            setUpdate(up=>!up)
        }
        console.log(data);

    }




    const toggleChecked = () => {
        setChecked(prev => !prev);
    };


    return (
        <>

            <Card className="card" sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={vacaunfollow.img}
                    alt={vacaunfollow.cityName}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {vacaunfollow.cityName}, {vacaunfollow.country}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {new Date(vacaunfollow.dateFrom).toLocaleDateString('he-IL')} - {new Date(vacaunfollow.dateUntil).toLocaleDateString('he-IL')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {vacaunfollow.descriptions}
                    </Typography>
                    <div className='pricefollowers'>
                        <Typography variant="h5">
                            ${vacaunfollow.price}
                        </Typography>
                        <Checkbox checked={checked} onChange={addfollow} icon={<FavoriteBorder />} checkedIcon={<Favorite color="error"/>} />
                        <Avatar>{vacaunfollow.NumberVacations}</Avatar>
                    </div>
                </CardContent>

            </Card>
        </>



    )
}
