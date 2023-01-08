const {Client} =require('pg')
const cors = require("cors");
const exp = require("express");

const app = exp();
app.use(cors());
app.use(exp.json());

const client=new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"sarumathei",
    database:"employe"
})

client.connect(function(err){
    if(err){console.log(err);}
    else{console.log("Database Connected")}
});


app.post('/signup',(req,res)=>{
    let phonenumber=req.body.phonenumber;
    let name=req.body.name;
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
        client.query("select phonenumber from signup where phonenumber=$1",[phonenumber],(error,rows)=>{
            if(error){
                let s={'invalid':'login'}
                res.send(s);
            }
            else{
             let email1=rows?.rows[0]?.phonenumber;
             if(email1===phonenumber ){
                let s={'status':'correct'};
                res.send(s);
             }
             else{
                let s={'status':'error'};
                client.query("insert into signup (name,phonenumber,address,password,confirmpassword,district,pincode,field,lastname,email)values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[
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
    let id=req.body.id;

    client.query("update signup set name=$1,phonenumber=$2,address=$3,password=$4,confirmpassword=$5,district=$6,pincode=$7,field=$8,lastname=$9,email=$10 where id=$11",[
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

app.post("/login",(req,res)=>{
    let phonenumber2=req.body.phonenumber;
    let password2=req.body.password;
    client.query("select * from signup where phonenumber=$1",[phonenumber2],(error,rows)=>{
        if(error){
            let s={'invalid':'login'}
            res.send(s);
        }
        else{
         let password1=rows?.rows[0]?.password;
         let email1=rows?.rows[0]?.phonenumber;
         if(email1==phonenumber2 && password1==password2){
            let s={'status':'correct',"data":rows};
            res.send(s);
         }
       
         else{
            let s={'status':'error'};
            res.send(s);
         }
        }
    })
})
app.post("/delete",(req,res)=>{
    let id=req.body.id;
    client.query("delete from signup where id=$1",[id],(err,result)=>{
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
app.listen(3006)