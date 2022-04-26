import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import { renderMatches } from 'react-router-dom';

// the compentent show the vacation that the user follow//////////

export default function VacationsCard({ vacafollow ,setUpdate }) {

    const [checked, setChecked] = useState(true);

    //  ====   The unfollow requets   ===   //

    const unfollow = async () => {
        const res = await fetch('http://localhost:1000/vacations/delfollow', {
            method: "delete",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ user_id: localStorage.id, vacations_id: vacafollow.id }),
            credentials: "include"
        })
        toggleChecked()
        setUpdate(up=>!up)
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
                    image={vacafollow.img}
                    alt={vacafollow.cityName}
                />


                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {vacafollow.cityName}, {vacafollow.country}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {new Date(vacafollow.dateFrom).toLocaleDateString('he-IL')} - {new Date(vacafollow.dateUntil).toLocaleDateString('he-IL')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {vacafollow.descriptions}
                    </Typography>
                    <div className='pricefollowers'>

                        <Typography variant="h5">
                            ${vacafollow.price}
                        </Typography>
                        <Checkbox checked={checked} onChange={unfollow} icon={<FavoriteBorder />} checkedIcon={<Favorite color="error" />} />
                        <Avatar>{vacafollow.NumberVacations}</Avatar>
                    </div>
                </CardContent>
            </Card>


        </>



    )
}
