import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Show from './Components/Show/Show';
import PrivateRoute from './Components/Login/PrivateRoute';
import Seats from './Components/Seats/Seats';


export const userContext = createContext();
function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    Fname: '',
    Lname: '',
    email: '',
    photo: '',
    password: ''
  })
  return (
    <userContext.Provider value={[user, setUser]}>
      <Router >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/show">
            <Show />
          </PrivateRoute>
          <Route path="/seats">
            <Seats />
          </Route>
        </Switch>

      </Router>
    </userContext.Provider>
  );
}

export default App;
