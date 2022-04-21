const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const axios=require("axios");
const session= require('express-session')

require('dotenv').config();

const app=express();
const port= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(session({
    secret:'$u9rc0d=',
    saveUninitialized: false,
    resave: false
}));


const uri=process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});
const connection=mongoose.connection;
connection.once('open', function(){
    console.log("Connected to DB.");
});

const user = require('./models/user.models');
const search = require('./models/usersearch.models');

app.post("/",function(request,response){
    axios.get('https://oauth2.googleapis.com/tokeninfo?id_token='+request.body.tokenId)
    .then(data => {
        const fn=data.data.given_name;
        const ln=data.data.family_name;
        const em=data.data.email;
        user.find({userEmailID:em})
        .then(result => {
            if(result.length==0){
                let dataIn=new user({userFname:fn,userLname:ln,userEmailID:em});
                dataIn.save();
            }
            response.json({userFname:fn,userLname:ln,userEmailID:em});
        })
        .catch(error=>console.log(error));
    })
    .catch(error=>console.log(error));
});

app.get('/logout',function(request,response){
    request.session.destroy((err) => {
        if (err) throw err;
      });
});

app.post("/search",async function(request,response){
    console.log(request.body);
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+request.body.book)
    .then(data=>{
        if(data.data.totalItems>0){
            var userem=request.body.user;
            user.find({userEmailID:userem},function(err ,doc){
                var uid=doc[0].id;
                search.find({userID:uid},function(err,doc){
                    var book=request.body.book;
                    if(doc.length==0){
                        let dataIn=new search({userID:uid,userSearch:[{bookname:book,value:1}]});
                        dataIn.save();
                    }
                    else{
                        search.findOneAndUpdate({userID:uid , 'userSearch.bookname':book},
                        {$inc: {"userSearch.$.value" :1}}
                        ,function(err,doc){
                            if(doc==null){
                                search.findOneAndUpdate({userID:uid},
                                    {$push:{userSearch:{bookname:book,value:1}}},
                                    function(err,doc){
                                        console.log(doc)
                                    })
                            }
                        })
                    }
                })
            })}
        response.send(data.data)
    })
    .catch(error=>console.log(error));
    
});

app.post("/books/:id",function(request,response){
    const param=request.params.id;
    axios.get("https://www.googleapis.com/books/v1/volumes/"+param)
    .then(data=>response.send(data.data))
    .catch(error=>console.log(error));
    
});

app.listen(port,function(){
    console.log(`Server running at port ${port}`);
});