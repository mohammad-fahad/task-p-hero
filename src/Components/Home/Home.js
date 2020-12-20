import React, { useContext, useEffect } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "firebase/app";
import "firebase/auth";
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import firebaseConfig from '../Login/firebaseConfig';


const Home = () => {
    const [user, setUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const googleLogIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email, photoURL } = result.user;
            const googleNewUser = { name: displayName, email: email, photo: photoURL };
            setUser(googleNewUser);
            history.push('/show');
        })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    return (
        <div className="bg">
            <h1 className="welcome">Welcome to the Cinema Hall</h1>
            <p className="text-center text-success">Please Login to continue</p>
            <div className="container container-fluid mt-5 login" onClick={googleLogIn}>
                <h5 className="text-white text-center ">Google Login</h5>
            </div>
        </div>
    );
};

export default Home;