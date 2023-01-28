const express=require('express');
const bodyparser =require("body-parser")
require("./src/db/conn");
const login = require("./src/models/register");
const additem = require("./src/models/additem");
const multer=require("multer");
const path=require("path");



const app = express();
var cors = require('cors')
app.use(cors())

app.use(
    bodyparser.urlencoded({
        extended:true,
    })
);

app.use(express.static('public'));

const port = process.env.PORT || 5000;

app.use(bodyparser.json())
app.use(express.json());



app.post("/add",async(req,res)=>{
    try{
        console.log(req.body);
        const additemm= new additem({ 

            cityname:req.body.cityname,
            select:req.body.select,
            address:req.body.address,
            phone:req.body.phone,
            best:req.body.best,
            name:req.body.name,
            email:req.body.email
            
        })
        const insertdata= await additemm.save().then((insertdata)=>{
             console.log(insertdata);
            res.json(insertdata);

        }).catch((e)=>{
            res.send(e);
        })
        
        
      
    }catch(e){
    res.send(e);
    }
})


app.post("/search",async(req,res)=>{
    try{
        const cityname=req.body.cityname;
        const select=req.body.select; 



     const city = await  additem.find({ $and: [{cityname:cityname },{select:select}]});
     res.send(city);
     console.log(city);

    }catch(e){
        res.send(e);
    }
}
)

app.post("/profile",async(req,res)=>{
    try{
        const empemail=req.body.empemail;



     const email = await  login.findOne({empemail:empemail });
     console.log(email);
     res.send(email);
     

    }catch(e){
        res.send(e);
    }
}
)

    

app.delete('/remove/:id', (req, res) =>
            {
                additem .findOneAndRemove({"_id" : req.params.id})
          .then( deleteddocument => { 
            if(deleteddocument != null)
            {  
  res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
            }  
            else
            {
  res.status(404).send('INVALID EMP ID '+ req.params.id); 
            }
          }) //CLOSE THEN
          .catch( err => {
 return res.status(500).send({message: "DB Problem..Error in Delete with id " + req.params.id });          
          })//CLOSE CATCH
             }//CLOSE CALLBACK FUNCTION BODY Line 60
            ); //CLOSE Delete METHOD Line 59



app.get('/search/:emailid', (req, res) => 
            {
      additem.find({"email" : req.params.emailid})
            .then(getsearchdocument => {
              if(getsearchdocument.length >0) 
              {
                res.send(getsearchdocument);
              }
              else
              {
  return res.status(404).send({message: "Note not found with id " + req.params.emailid });
              }
          }) //CLOSE THEN
            .catch( err => {
  return res.status(500).send({message: "DB Problem..Error in Retriving with id " + req.params.emailid });           
            })//CLOSE CATCH
          }//CLOSE CALLBACK FUNCTION BODY Line 88
         );//CLOSE GET METHOD L








app.post("/login",async(req,res)=>{
    try{
        const empemail=req.body.adminid;
        const emppass=req.body.adminpass;
        console.log(req.body)
       



     const useremails= await  login.findOne({empemail:empemail});
     console.log("kushal",useremails)

     if(useremails==null){
       
        res.send("No");
     }
     
     else if(useremails.emppass=== emppass)
     {
      
        res.send(useremails);
       
     }
     else{
        
        res.send("No");
        console.log("not")
     }
     
       
    }catch(e){
        res.send(e);
    }
}
)





const multerStorage = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });



const upload = multer({
    storage: multerStorage,
   
  });


  app.post("/photo",upload.single("myfiles"),(req,res)=>{
   
  console.log("lkj",req.file)
    res.send(req.file.filename)
})



app.post("/register",async(req,res)=>{
       try{
       console.log( "kushal",req.body)
     
          
           const addlogin= new login({ 

           
               empfname: req.body.empfname ,
               emplname: req.body.emplname,
              empemail: req.body.empemail,
              emppass:req.body.emppass,
              image:req.body.image
             
              
               
           })
           const ins= await addlogin.save().then((ins)=>{
               res.send(ins);
               console.log(ins);
               
                     
           }).catch((e)=>{
               res.send("NO");
              
           })
           
           
         
       }catch(e){
       res.send(e);
       }
})

app.listen(port,()=>{
    console.log(`connection is live at ${port}`);
})