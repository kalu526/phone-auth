import React,{useState} from 'react'
import { Form,Button,Card } from 'react-bootstrap';
import { auth } from './firebase';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import 'react-phone-number-input/style.css'
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
   axios.post(`http://localhost:8000/api/user/register`,data)
    .then((res,err)=>{
       if(res){
         seterrormessage("");
         setsuccessmessage("You Registered Successfully");
        setuser(true);
        console.log(res.data.phone_number);
        
        setuserinfo(userinfo);
     
       setuserinfo(userinfo);
       }
    })
   .catch((err)=>{
     setsuccessmessage("")
    if(phone_number=="" && password==""){
      seterrormessage("Phone NUmber and Password is required")
    }
    else if(phone_number.length <13 || phone_number.length >13){
      seterrormessage("The Phone NUmber is Too SHort or Too Long")
    }
    else if(phone_number==""){
     seterrormessage("Phone Number is required")
    }
    else if(password ==""){
      seterrormessage(" Password is required")

    }
    else if(data.phone_number ===phone_number){
      seterrormessage("The User with this Number already exist")
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
          {successmessage && <p style={{color:"green"}}>You Registered Successfully</p>}
          <Form.Group className='d-flex flex-direction-row'>
            <Form.Label id="phonenumber">PhoneNumber</Form.Label>
            <PhoneInput
  international
  countryCallingCodeEditable={false}
  defaultCountry="RU"
  value={phone_number}
  onChange={(e)=>setphone_number(e.target.value)}/>
  
          </Form.Group>
          
          <Form.Group>
          <Form.Label id="password">Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
          </Form.Group>
          {errormessage && <p style={{color:"red"}}>{errormessage}</p>}
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
