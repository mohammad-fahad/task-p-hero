import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const Seats = () => {
    const [seats, setSeats] = useState([]);
    const [user] = useContext(userContext);

    useEffect(() => {
        fetch('https://young-dawn-94852.herokuapp.com/seatsCollections')
            .then(res => res.json())
            .then(data => setSeats(data))
    }, [seats])
    const handleClick = (event, id) => {
        fetch(`https://young-dawn-94852.herokuapp.com/update/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: "close" }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const newData = [...seats];
                    newData.status = data;
                    const a = seats.filter(se => se.status.toLowerCase() === "close")
                    if (a.length <= 8) {
                        setSeats(newData)
                        alert("You have successfully booked a seat")

                    } else {
                        document.getElementById('disabled').style.pointerEvents = 'none';
                        alert("no more then 10 seats per person")

                    }



                }

            })

    }

    return (
        <div className="bg-dark">
            <div className="d-flex container pt-3">
                <Link to="/show"><h1 className="text-center text-white">Back</h1></Link>
                <div className="ml-auto d-flex align-items-center user">
                    <img style={{ borderRadius: '50px', height: '50px' }} src={user.photo} alt="" />
                    <h5 className="pl-3 text-light">{user.name}</h5>
                </div>
            </div>
            <div id='disabled' className="d-flex flex-wrap container container-fluid">
                {
                    seats.map(seat => <Button id="btn" key={seat._id} onClick={(e) => { handleClick(e, `${seat._id}`) }} variant={seat.status === 'open' ? 'success' : 'danger'} className="d-flex align-items-center justify-content-center m-3" style={{ width: '10rem', height: '10rem', border: '1px solid black', color: 'white' }}> <h1 className={seat.status === 'open' ? 'text-white' : 'text-muted'}> {seat.number} </h1> </Button>)
                }
            </div>
        </div>
    );
};

export default Seats;