import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Container,Row} from 'reactstrap';
import {Provider} from "react-redux";
import {store} from "./UserStore.js";


import Home from './Components/Home.js';
import Admin from "./Components/AdminLogin.js";
import Login from './Components/Login.js';
import AboutUs from './Components/AboutUs.js';
import Registration from './Components/Registration.js';
import EventList from './Components/EventList.js';
import Profile from './Components/Profile.js';
import AdminHome from './Components/Admin.js';
import ADDEvent from './Components/AddEvent.js';
import UpdateEvent from './Components/UpdateEvent.js';
import MoreDetails from './Components/MoreDetails.js';
import Booking from './Components/Booking.js';

function App() {
  return (

      // <Container fluid>
        <BrowserRouter>
        
          <Row>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/AdminLogin' element={<Admin/>}></Route> 
              <Route path='/UserLogin' element={<Login/>}></Route> 
              <Route path='/register' element={<Registration/>}></Route>
              <Route path='/booking/:eventId' element={<Booking/>}></Route>

              <Route path='/EventList' element={<EventList/>}></Route>
              <Route path='/MoreDetails/:id' element={<MoreDetails/>}></Route>
              <Route path='/AboutUs' element={<AboutUs/>}></Route>
              <Route path='/Profile' element={<Profile/>}></Route>
              <Route path='/AdminHome' element={<AdminHome/>}></Route>
              <Route path='/AddEvent' element={<ADDEvent/>}></Route>
              <Route path='/UpdateEvent/:id' element={<UpdateEvent/>}></Route>
             
              
            </Routes>
          </Row>

        </BrowserRouter>
      // </Container>
    
  );
}

export default App;
