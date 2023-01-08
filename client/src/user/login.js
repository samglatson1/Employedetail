import React,{useState} from "react";
import { Link,useNavigate ,createSearchParams} from "react-router-dom";
import axios from "axios";
import Dashboard from "../dashboard/dashboard";
export default function Login(){

    const[phonenumber,setPhonenumber]=useState();
    const[password,setPassword]=useState();
    const navigate = useNavigate();

    const[dashboard,setDashbard]=useState(false)
    let dsah=0;
    
    const adddata=()=>{
        let data={phonenumber:phonenumber,password:password}
        if(phonenumber==undefined&&password==undefined){
            alert("enter phonenumber and  password")
        }
        else{        
        axios.post("http://localhost:3006/login",data).then(function(response){
            if(response.data.status==='correct'){
                alert("login successfull");
                // console.log(response.data.data)
                 dsah=response.data.data.rows?.[0]
            toComponentB();

            }
            if(response.data.status==='error'){
                alert(" Password or Phonenumber Wrong")
                setDashbard(false)
            }
            
        })}
    }
 

    const toComponentB=()=>{
        navigate('/dashboard',{state:dsah});
          
    }
  
    return(<>
    <div className="container">
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
             <h3>EMPLOYE LOGIN </h3>
            </div>
        </div>
        <div className="row  mt-3">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <input type={'text'} placeholder="Enter  Mobile Number" onChange={(e)=>setPhonenumber(e.target.value)}/>
            </div>
        </div>
        <div className="row  mt-3">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <input type={'password'} placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
        </div>
        <div className="row  mt-3">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <button onClick={adddata}>Login </button>
            </div>
        </div>
        <div className="row  mt-3">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
         <Link to={"/signup"} > <button>Siginup  </button>
</Link>             </div>
        </div>
    </div>
    {dashboard &&
        <div>
            <Dashboard/>
        </div>
    }
        
    </>)
}