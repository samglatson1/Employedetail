import React,{useState} from "react";
import { useLocation,Link,useNavigate } from "react-router-dom";
import axios from "axios";
export default function Dashboard(){
    const location = useLocation();
    const[name,setName]=useState(location.state.name);
const[phonenumber,setPhonenumber]=useState(location.state.phonenumber);
const[address,setAddress]=useState(location.state.address);
const[password,setPassword]=useState(location.state.password);
const[confirmpassword,setConfirmpassword]=useState(location.state.confirmpassword);
const[district,setDistrict]=useState(location.state.district);
const[pincode,setPincode]=useState(location.state.pincode);
const[field,setField]=useState(location.state.field);
const[lastname,setLastname]=useState(location.state.lastname);
const[email,setEmail]=useState(location.state.email);
const navigate = useNavigate();

const update=()=>{
    let data={name:name,phonenumber:phonenumber,address:address,password:password,confirmpassword:confirmpassword,district:district,
    pincode:pincode,field:field,lastname:lastname,email:email,id:location.state.id}
    if(password!=confirmpassword){
        alert("Password Not match Pleace check")
    }
    else{
        axios.post("http://localhost:3006/update",data).then(function(response){
            if(response.data.status==='updated'){
                alert("Your account is updated")
                alert("login again");
               navigateTologin();
            }
        })
    }
    
}
const navigateTologin = () => {
    navigate('/login');
  };
  const Delete=()=>{
    let data={id:location.state.id}
    axios.post("http://localhost:3006/delete",data).then(function(responce){
        if(responce.data.status==='deleted'){
            alert("Your Account is deleted successfully ");
            alert("Please siginup");
            navigateTologin();

        }
    })
  }

  
   
    return(
        <>
        
       <h3>Name</h3>
       <input type={"text"} defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
       <h3>Last Name</h3>
       <input type={"text"} defaultValue={lastname}  onChange={(e)=>setLastname(e.target.value)} maxLength={2}/>
       <h3>Phone number</h3>
       <input type={'tel'} defaultValue={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)}/>
       <h3>Address</h3>
       <input type={"text"} defaultValue={address} onChange={(e)=>setAddress(e.target.value)}/>
       <h3>Password</h3>
       <input type={'text'} defaultValue={password} onChange={(e)=>setPassword(e.target.value)}/>
       <h3>Confirm password</h3>
       <input type={'password'} defaultValue={confirmpassword}  onChange={(e)=>setConfirmpassword(e.target.value)}/>
       <h3>District</h3>
       <input type={"text"} defaultValue={district} onChange={(e)=>setDistrict(e.target.value)}/>
       <h3>Pincode</h3>
       <input type={"text"} defaultValue={pincode} maxLength={6} onChange={(e)=>setPincode(e.target.value)}/>
       <h3>Field of Working</h3>
       <input type={'text'} defaultValue={field} onChange={(e)=>setField(e.target.value)}/>
       <h3>Email</h3>
       <input type={"text"} defaultValue={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
       <Link to={'/login'}> <button>Log out</button></Link>  
       <button onClick={update}>Update</button>   
        <button onClick={Delete}>Delete Account</button>
        </>
    )
}