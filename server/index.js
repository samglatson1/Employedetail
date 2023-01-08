const exp = require("express");
const mycon = require("mysql2");
const cors = require("cors");

const app = exp();
app.use(cors());
app.use(exp.json());



const c = mycon.createConnection({
    host : "localhost",
    user:"root",
    password:"Sam@12345",
    database:"employe"
});

c.connect(function(err){
    if(err){console.log(err);}
    else{console.log("Database Connected")}
})


app.post('/signup',(req,res)=>{
    let name=req.body.name;
    let phonenumber=req.body.phonenumber;
    let address=req.body.address;
    let password=req.body.password;
    let confirmpassword=req.body.confirmpassword;
    let district=req.body.district;
    let pincode=req.body.pincode;
    let field=req.body.field;
    let lastname=req.body.lastname;
    let email=req.body.email;
    let numbercheck=true;
    let phonenumber2=req.body.phonenumber;

    if(numbercheck){
        c.query("select * from signup where phonenumber=?",[phonenumber2],(error,rows)=>{
            if(error){
                let s={'invalid':'login'}
                res.send(s);
            }
            else{
             let email1=rows[0]?.phonenumber;
             if(email1==phonenumber2 ){
                let s={'status':'correct'};
                res.send(s);
             }
             else{
                let s={'status':'error'};
                c.query("insert into signup (name,phonenumber,address,password,confirmpassword,district,pincode,field,lastname,email)values(?,?,?,?,?,?,?,?,?,?)",[
                    name,phonenumber,address,password,confirmpassword,district,pincode,field,lastname,email
                ],(err,result)=>{
                    if(err){
                        let s={'data':'not inseted'}
                        // res.send(s);
                        console.log(s); 
                    }
                    else{
                        let s={'status':'inserted'}
                        res.send(s);
                    }
                })               
             }
            }
        })
    }else{
       
    }
   
})


app.post('/update',(req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let phonenumber=req.body.phonenumber;
    let address=req.body.address;
    let password=req.body.password;
    let confirmpassword=req.body.confirmpassword;
    let district=req.body.district;
    let pincode=req.body.pincode;
    let field=req.body.field;
    let lastname=req.body.lastname;
    let email=req.body.email;
    
    c.query("update signup set name=?,phonenumber=?,address=?,password=?,confirmpassword=?,district=?,pincode=?,field=?,lastname=?,email=? where id=?",[
        name,phonenumber,address,password,confirmpassword,district,pincode,field,lastname,email,id
    ],(err,result)=>{
        if(err){
            let s={'data':'not updated'}
            // res.send(s);
            console.log(s); 
            console.log(err)
        }
        else{
            let s={'status':'updated'}
            res.send(s);
        }
    })
})
app.post("/delete",(req,res)=>{
    let id=req.body.id;
    c.query("delete from signup where id=?",[id],(err,result)=>{
        if(err){
            let s={'data':'not deleted'}
            console.log(s)
        }
        else{
            let s={'status':'deleted'}
            res.send(s)
        }
    })
})
app.post("/login",(req,res)=>{
    let phonenumber2=req.body.phonenumber;
    let password2=req.body.password;
    c.query("select * from signup where phonenumber=?",[phonenumber2],(error,rows)=>{
        if(error){
            let s={'invalid':'login'}
            res.send(s);
        }
        else{
         let password1=rows[0]?.password;
         let email1=rows[0]?.phonenumber;
         if(email1==phonenumber2 && password1==password2){
            let s={'status':'correct',"data":rows};
            console.log(rows)
            res.send(s);
         }
       
         else{
            let s={'status':'error'};
            res.send(s);
         }
        }
    })
})
app.listen(3006)