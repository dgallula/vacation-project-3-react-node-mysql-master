import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { useEffect } from 'react';

export default function CharAdmin() {

    const [vacations, setVacations] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:1000/admin/follow', {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
                credentials: "include"
            })
            const data = await res.json();
            if (data.err) {
                alert(data.err)
            } else {
                setVacations(data)
            }
            console.log(data);


        })()


    }, [])

    const barChart = (

        <Bar
            data={{
                labels: vacations.map((vacachart) => vacachart.cityName),
                datasets: [
                    {
                        label: 'Vacations Chart',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1,
                        data: vacations.map((vacachart) => vacachart.NumberVacations),
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Vacations` },
            }}
        />

    );


    return (
        <div>
            <h2 className='h1header'>Here you can see all the vacations your customers are following </h2>
            {barChart}
        </div>
    )
}
