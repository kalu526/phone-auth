import React,{useState} from 'react'
import { Form,Button,Card } from 'react-bootstrap';
import { auth } from './firebase';
import axios from 'axios';

import { BrowserRouter as Router,Routes, Route,Link } from "react-router-dom";
export default function Register() {
   const [phone_number,setphone_number]=useState('');
   const [password,setpassword]=useState('');
   const [successmessage,setsuccessmessage]=useState('');
   const [user,setuser]=useState(false);
   const [userinfo,setuserinfo]=useState({});
   const [errormessage,seterrormessage]=useState('');
 
   const logout = () => {
    setuser(false);
}

   const handlesignup=(e)=>{
    e.preventDefault();
    
   const data={
       phone_number:phone_number,
       
       password:password
   }
   axios.post(`http://localhost:8000/api/register/createuser`,data)
    .then((res,err)=>{
       if(res){
         seterrormessage("");
        setuser(true);
        console.log(res.data.phone_number);
       setsuccessmessage("You Registered Successfully");
       }
    })
   .catch((err)=>{
    if(phone_number=="" && password==""){
      alert("phoneNUmber and password is required");
    }
    else if(phone_number==""){
      alert("phoneNumber is required");
    }
    else if(password ==""){
alert("password is required");

    }
    else if(userinfo.phone_number ==phone_number){
      alert("User with This PhoneNumber is Already exist");
    }
    
   })
   
}
  
  return (
    <Card>
      <Card.Body>
        <>
    {!user ?(
      <>
      <Form>
          <h3 style={{textAlign:"center"}}>Register Here</h3>
          <Form.Group>
            <Form.Label id="phonenumber">PhoneNumber</Form.Label>
            <Form.Control type="text" value={phone_number} onChange={(e)=>setphone_number(e.target.value)}/>
          </Form.Group>
          <Form.Group>
          <Form.Label id="password">Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
          </Form.Group>
          <Link to="/mainlogin"><Button type="submit" onClick={handlesignup} style={{marginTop:"20px", marginLeft:"30px"}}>Register</Button></Link>
        </Form>
        <div >
        Already Have account? <Link to="/mainlogin"><button style={{backgroundColor:"teal", padding:"5px 3px" ,color:"white" ,border:"white" ,borderRadius:"5px"}}>Login</button></Link> 
        </div>
        </>
    ):(
      <div style={{ marginTop: 250 }}>
      <center>
          <h3>Welcome {phone_number}</h3>
          <Button style={{ "marginLeft": "20px" }} 
            onClick={logout} >Logout</Button>
      </center>
  </div>
    )}
    </>
        
      </Card.Body>
    </Card>
  )
}
