import Register from "./components/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Login from "./components/login";
import Mainlogin from "./components/mainlogin";
import Main from "./components/main";
import {auth} from './components/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Signin from "./components/signin";


function App() {
   
  const [user,loading,error]=useAuthState(auth);
         
  return (
    <Router>
    <Container className="d-flex align-items-center justify-content-center" >
     
    <div className="App"> 
      <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/mainlogin" element={<Mainlogin/>}/>
    <Route path="/signup" element={user?<Main/>:<Login/>}/>
    <Route path="/signin" element={user?<Main/>:<Signin/>}/>
      </Routes>
    </div>
   
    </Container>
    </Router>
    
  );
}

export default App;
