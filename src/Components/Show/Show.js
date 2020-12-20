import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './show.css';

const Show = () => {
    const [user, setUser] = useContext(userContext);
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetch('https://young-dawn-94852.herokuapp.com/moviesCollections')
            .then(res => res.json())
            .then(data => setMovies(data))
    })


    return (
        <div className="bg-dark">
            <div className="d-flex container pt-3">
                <h1 className="text-white text-bold "><strong>Movie lists</strong></h1>
                <div className="ml-auto d-flex align-items-center user">
                    <img style={{ borderRadius: '50px', height: '50px' }} src={user.photo} alt="" />
                    <h5 className="pl-3 text-light">{user.name}</h5>
                </div>
            </div>

            <div className="container container-fluid d-flex flex-wrap mt-5">
                {
                    movies.map(movieList => <Card className='m-3 bg-light movies' style={{ width: '18rem', border: 'none', borderRadius: '30px' }}>
                        <Card.Img variant="top" src={movieList.img} />
                        <Card.Body>
                            <Card.Title> <strong>{movieList.name}</strong> </Card.Title>
                            <Card.Text>
                                {movieList.description}
                            </Card.Text>
                            <div className="d-flex justify-content-between">
                                <Card.Text>
                                    <strong> Date: </strong> {movieList.date}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Time: </strong> {movieList.time}
                                </Card.Text>
                            </div>
                            <div className="d-flex align-items-center">
                                <Link to="/seats">
                                    <Button variant="success" className="mt-auto" style={{ borderRadius: '40px', bottom: '0' }}> <strong>Book your sit now!</strong> </Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                    )

                }
            </div>
        </div >
    );
};

export default Show;