import React,{useState,useEffect} from "react";
import axios from "axios";
import  { useNavigate } from 'react-router-dom'


export default function Signup(){

const[name,setName]=useState();
const[phonenumber,setPhonenumber]=useState();
const[address,setAddress]=useState();
const[password,setPassword]=useState();
const[confirmpassword,setConfirmpassword]=useState();
const[district,setDistrict]=useState();
const[pincode,setPincode]=useState();
const[field,setField]=useState();
const[lastname,setLastname]=useState();
const[email,setEmail]=useState();
const navigate = useNavigate();

const adddata=()=>{
    if(name===undefined || phonenumber===undefined || address===undefined || password===undefined || confirmpassword===undefined || district ===undefined || pincode ===undefined || field===undefined || lastname===undefined || email===undefined){
        alert("Some Field is missing")
       
    }
    else{
        if(password!=confirmpassword){
            
            alert("Password Not match Pleace check")
        }else{
            let data={name:name,phonenumber:phonenumber,address:address,password:password,confirmpassword:confirmpassword,district:district,
                pincode:pincode,field:field,lastname:lastname,email:email}
                console.log(data)
                axios.post("http://localhost:3006/signup",data).then(function(response){
                    if(response.data.status==='inserted'){
                        alert("Signup successfully");
                       navigateTologin();
                    }
                    if(response.data.status==='correct'){
                        alert("Phone number alerdy exits")
                    }
                })
        }
  
}
}
const navigateTologin = () => {
    navigate('/login');
  };

    return(
        <>
    
        <div className="container">
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h4>Employee Details</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6">
                    <input type={'text'} placeholder="Enter full name " onChange={(e)=>setName(e.target.value)} required/>

                </div>
                <div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6">
                    <input type={'text'} placeholder="Enter Last name " onChange={(e)=>setLastname(e.target.value)} maxLength={2} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6">
                    <input type={'text'} placeholder="Enter Phone number " onChange={(e)=>setPhonenumber(e.target.value)} required/>

                </div>
                <div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6">
                    <input type={'text'} placeholder="Enter  Address" onChange={(e)=>setAddress(e.target.value)} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6">
                    <input type={'text'} placeholder="Enter district" onChange={(e)=>setDistrict(e.target.value)} required/>

                </div>
                <div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6">
                    <input type={'text'} placeholder="Enter  Pincode" maxLength={6} onChange={(e)=>setPincode(e.target.value)} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6">
                    <input type={'text'} placeholder="Enter Working field  " onChange={(e)=>setField(e.target.value)} required/>

                </div>
                <div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6">
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6">
                    <input type={'password'} placeholder="Enter password  " onChange={(e)=>setPassword(e.target.value)} required/>

                </div>
                <div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6">
                    <input type={'password'} placeholder="confirm password"  onChange={(e)=>setConfirmpassword(e.target.value)} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <input type={'text'} placeholder={"enter email"} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <button onClick={adddata}>Sign up</button>
                </div>
            </div>
        </div>
    </>
    )
   
}
