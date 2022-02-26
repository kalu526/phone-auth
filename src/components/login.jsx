
import React, { useState } from 'react';
import { firebase, auth } from './firebase';
import { Form,Button,Card } from 'react-bootstrap';
import {useAuthState} from 'react-firebase-hooks/auth';
import { BrowserRouter as Router,Routes, Route,Link } from "react-router-dom";
import axios from 'axios';
const Login = () => {
    // Inputs
    const [mynumber, setnumber] = useState("");
    const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');
    const [successmessage,setsuccessmessage]=useState('');
    const [errormessage,seterrormessage]=useState('');
    const [phone_number,setphone_number]=useState('');
   const [password,setpassword]=useState('');
   
  
    // Sent OTP
    const signin = (e) => {
  e.preventDefault();
  if(phone_number =="" && password ==""){
      alert("Phone Number and Password is required");
  }
         else if (phone_number === "" || phone_number.length < 10){
            alert("Phone Number is required and must not be less than 10 digit")
        }else if(password ==""){
            alert("password is required");
        }
    
        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        auth.signInWithPhoneNumber(phone_number, verify).then((result) => {
            setfinal(result);
            alert("we have sent you 6-digit code ");
            setshow(true);
            
        })
            .catch((err) => {
                
                window.location.reload();
            });
    }
  
    // Validate OTP
    const ValidateOtp = (e) => {
        e.preventDefault();
        const data={
            phone_number:phone_number,
            
            password:password
        }
        if (otp === null || final === null)
            return;
        final.confirm(otp).then((result) => {

           alert("Success Message")
           console.log(result);

           axios.post(`http://localhost:8000/api/register/createuser`,data)
           .then((res,err)=>{
              if(res){
                seterrormessage("");
              setsuccessmessage("You Registered Successfully");
              console.log(res.data);
              }
           })

        }).catch((err) => {
            alert("Wrong code");
        })
    }
    return (
        <Card >
            <Card.Body>
                
        <Form style={{ "marginTop": "20px"}}>
        
                <div style={{ display: !show ? "block" : "none" }}>
                <h2 className="mb-1 text-align-center fz-14 fw-300 mb-2 ">SignUp With PhoneNumber</h2>
                    
                <Form.Group>
            <Form.Label id="phonenumber">PhoneNumber</Form.Label>
            <Form.Control type="text" value={phone_number} onChange={(e)=>setphone_number(e.target.value)}/>
          </Form.Group>
          <Form.Group>
          <Form.Label id="password">Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
          </Form.Group>
                    <br /><br />
                    <div id="recaptcha-container"></div>
                    <Button onClick={signin}>Send OTP</Button>
                </div>
                <div style={{ display: show ? "block" : "none" }}>
                <h2 className="mb-1 text-align-center fz-14 fw-300 mb-2">Verification Code</h2>
                    <Form.Control type="text" placeholder="Enter your OTP"
                        onChange={(e) => { setotp(e.target.value) }}/>
                    <br /><br />
                    <Button onClick={ValidateOtp} className="ml-2">Verify</Button>
                </div>
               
            
        </Form>
        <div style={{display:"flex",flexDirection:"row",alignnItems:"center",marginTop:"20px"}}>
         register ? <Link to="/"><button style={{backgroundColor:"blueviolet", padding:"5px 3px" ,color:"white" ,border:"white" ,borderRadius:"5px", marginLeft:"5px",marginRight:"5px"}}>Register</button></Link> or
          Have account ?<Link to="/mainlogin"><button style={{backgroundColor:"teal", padding:"5px 3px" ,color:"white" ,border:"white" ,borderRadius:"5px",marginLeft:"5px"}}>Login</button></Link>
          <Link to="/signin"><button style={{backgroundColor:"tomato", padding:"5px 3px" ,color:"white" ,border:"white" ,borderRadius:"5px"}}>Signin with Phone</button> </Link>
        </div>
        </Card.Body>
        </Card>
    );
}
  
export default Login;
