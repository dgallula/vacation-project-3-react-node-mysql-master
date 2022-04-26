import React, { useEffect, useState } from 'react';
import Login from './Login';
import AdminCard from './AdminCard';
import VacationUser from './VacationUser';
import VacationUnfollow from './VacationUnfollow';
import Admin from './Admin';
import Nonfollow from './Nonfollow';



export default function Vacations() {


    const [update, setUpdate] = useState(false);
    const [update1, setUpdate1] = useState(false);
    const [currUser, setCurrUser] = useState(localStorage.username);
    const [currUserId, setCurrUserId] = useState(localStorage.id);
    const [vacations, setVacations] = useState([]);
    const [vacationsID, setVacationsID] = useState([]);
    const [vacationsFollow, setVacationsFollow] = useState([]);
    const [vacationsUnFollow, setVacationsUnFollow] = useState([]);


    //Get all vacations
    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:1000/vacations', {
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
            // console.log(data);


        })()


    }, [update1])



    useEffect(() => {
        setTimeout(() => {

            
            (async () => {
                const res = await fetch(`http://localhost:1000/vacations/follow/${currUserId}`, { // The vacations user follow
                    method: 'GET',
                    headers: { 'content-type': 'application/json' },
                    credentials: "include"
                })
                const data1 = await res.json();
                let newDatad = data1.map(vac => ({ ...vac }));
                if (data1.err) {
                    alert(data1.err)
                } else {
                    setVacationsFollow(newDatad)
                }
                console.log(data1);


            })();
            (async () => {
                const res = await fetch(`http://localhost:1000/vacations/unfollow/${currUserId}`, { // The vacations user unfollow
                    method: 'GET',
                    headers: { 'content-type': 'application/json' },
                    credentials: "include"
                })
                const data = await res.json();
                if (data.err) {
                    alert(data.err)
                } else {
                    setVacationsUnFollow(data)
                }
                console.log(data);


            })();
            (async () => {
                const res = await fetch(`http://localhost:1000/vacations/unfollow`, { // The vacations no one follow
                    method: 'GET',
                    headers: { 'content-type': 'application/json' },
                    credentials: "include"
                })
                const data1 = await res.json();
                if (data1.err) {
                    alert(data1.err)
                } else {
                    setVacationsID(data1)
                }
                console.log(data1);


            })()
            
        }, 500);
        
    }, [update])



    return (
        <div>
            {
                !localStorage.username ?
                    <>
                        <Login />
                    </>
                    :
                    <>



                        {
                            localStorage.role === "user" ?
                                <>
                                    <h1 className='h1header'>Howdy {localStorage.username} 😉</h1>
                                    <h3 className='h1header'>Here you can see all the vacations we have! </h3>
                                    <h3 className='h1header'>You can follow and unfollow vacations </h3>
                                    <h3 className='h1header'>Enjoy your stay 😀 </h3>
                                    <div className='uppercard' >

                                        {
                                            vacationsFollow.map(vacafollow => <VacationUser key={vacafollow.id} vacafollow={vacafollow} setUpdate={setUpdate} />)
                                        }

                                        {
                                            vacationsUnFollow.map(vacaunfollow => <VacationUnfollow key={vacaunfollow.id} vacaunfollow={vacaunfollow} setVacationsFollow={setVacationsFollow} setUpdate={setUpdate} />)
                                        }
                                        {
                                            vacationsID.map(nonfollow => <Nonfollow key={nonfollow.id} nonfollow={nonfollow} setUpdate={setUpdate} />)
                                        }
                                    </div>

                                </>
                                :
                                <>
                                    <h1 className='h1header'>Your Admin Page</h1>
                                    <h3 className='h1header'>mr.Admin, here you can edit, delete and post new vacations to your customers</h3>
                                    <div className='uppercard' >
                                        {
                                            vacations.map(vaca => <AdminCard key={vaca.id} vaca={vaca} setUpdate1={setUpdate1} />)
                                        }

                                    </div>
                                    <Admin setVacations={setVacations} vacations={vacations} />

                                </>
                        }

                    </>
            }
        </div>
    )
}
