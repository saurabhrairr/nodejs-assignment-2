const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userschema = require("./userschema");
const ejs = require("ejs");
app.set("view engine", "ejs");

const methodOveride=require("method-override")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOveride("_method"))


const getClass=(isPromoted)=>
{
       let className="second"
       if(isPromoted)
       {
              className="first"
       }else if(isPromoted !==null)
       {
               className="third"
       }
       return className
}

//servre create app.listen
app.listen(3320, (err) => {
  if (!err) {
    console.log("server start on port 3320");
  } else {
    console.log(err);
  }
});




//here we conncet to monngo db and we create collection name assignment-4
mongoose.connect("mongodb://localhost/assignment-4", () => {
  console.log("connect to db");
}),
  (err) => {
    console.log(err);
  };

//

app.get("/", (req, res) => {
  userschema.find().then((user) => {
    res.render("user", { user ,getClass});
  });
});



//this are used to add new user if user  are already present like same email address than it go to page /user/add
//throw and error "user exit" it show 61 to 63 line next it create new user and res,redirect used again home page
app.post("/user/add", (req, res) => {
  userschema.find({ email: req.body.email }).then((userdata) => {
    if (userdata.length) {
      res.status(400).send("user exit");
    } else {
      userschema
        .create({
          name: req.body.name,
          email: req.body.email,
          isPromoted: null,
        })
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
//here we used update that the data using id 
app.put("/user/update/:id",(req,res)=>
{
       userschema.find({email:req.params.id}).then((userdata)=>
       {
              userschema.updateOne({email:req.params.id},{isPromoted:!userdata[0].isPromoted}).then(()=>
              {
                     res.redirect("/")
              }).catch((err)=>
              {
                     res.status(400).send(err)
              })
       
       })
})
//       userschema.updateOne({email:id},[{$set:{
//        "isPromoted":{"$eq":[null,"isPromoted"]}
//       }}]).then(()=>
//       {
// res.redirect("/")
//       })



//how can delete  that a record we delete by id
app.delete("/user/delete/:id",(req,res)=>
{
       userschema.deleteOne({email:req.params.id}).then(()=>
       {
              res.redirect("/")
       })
})


//here we /form page like http://localhost:3320/form  form page / are used to route 
app.get("/form", (req, res) => {
  res.render("userfrom");
});
