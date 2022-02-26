
import React,{useState} from 'react'
import { Form,Button,Card } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router,Routes, Route,Link } from "react-router-dom";
import { auth } from './firebase';
export default function Mainlogin() {
    const [phone_number,setphone_number]=useState('');
    const [password,setpassword]=useState('');
    const [successmessage,setsuccessmessage]=useState('')
    const [user,setuser]=useState(false);
    const [userinfo,setuserinfo]=useState({})
    const [errormessage,seterrormessage]=useState('')

    const logout = () => {
      setuser(false);
  }

    //sign in
  const handlesignin=(e)=>{
    e.preventDefault();
    seterrormessage("");
    const data={
      phone_number:phone_number,
      password:password,
    }
    axios.post(`http://localhost:8000/api/user/login`,data)
    .then((res)=>{
      setuserinfo(res.data);
      setuser(true);
      console.log(res.data);
     
    })
   .catch((err,res)=>{
    if(phone_number=="" && password==""){
      alert("phoneNUmber and password is required");
    }
    else if(phone_number==""){
      alert("phoneNumber is required");
    }
    else if(password ==""){
alert("password is required");

    }
    else if(userinfo.phone_number !==phone_number || userinfo.password !==password){
      alert("phoneNumber or Password is Incoorect");
    }
    else{
      alert("Successfully loged in")
    }
   
   })
  
  }
  return (
    <Card>
    <Card.Body>
      {!user ?(
<>
<Form>
        <h3 style={{textAlign:"center"}}>Login Here</h3>
        <Form.Group>
          <Form.Label id="phonenumber">PhoneNumber</Form.Label>
          <Form.Control type="text" value={phone_number} onChange={(e)=>setphone_number(e.target.value)}/>
        </Form.Group>
        <Form.Group>
        <Form.Label id="password">Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
        </Form.Group>
        <Button type="submit" onClick={handlesignin} style={{marginTop:"20px", marginLeft:"30px",backgroundColor:"teal"}}>Login</Button>
      </Form>
      <div >
     create Account? <Link to="/"><button style={{backgroundColor:"blueviolet", padding:"5px 3px" ,color:"white" ,border:"white" ,borderRadius:"5px"}}>Register</button></Link> or 
     <Link to="/signup"><button style={{backgroundColor:"tomato", padding:"5px 3px" ,color:"white" ,border:"white" ,borderRadius:"5px"}}>SignUp with Phone</button> </Link>  
     <Link to="/signin"><button style={{backgroundColor:"tomato", padding:"5px 3px" ,color:"white" ,border:"white" ,borderRadius:"5px"}}>Signin with Phone</button> </Link> 
      </div>
</>
      ):(
        <div style={{ marginTop: 250 }}>
        <center>
            <h3>Welcome Back {phone_number}</h3>
            <Button style={{ "marginLeft": "20px" }} 
              onClick={logout} >Logout</Button>
        </center>
    </div>
      )}
     
    </Card.Body>
  </Card>
  )
}