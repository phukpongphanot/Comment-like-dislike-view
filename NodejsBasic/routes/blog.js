var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
/* GET users listing. */

///////// config database /////////////////////////////////////
const mongoose = require('mongoose');

const config = {
    autoIndex:true,
    useNewUrlParser: true,
};
const connectionString = 'mongodb://localhost:27017/Portfolio_PJ'

mongoose.connect(connectionString, config)
 .then(() => console.log('connect db ....'))
 .catch(err => console.log('error connect db...'));

 const commentSchema = new mongoose.Schema({
     name : String,
     description : String

 });

 
///////// config database ////////////////////////////////////////

 var count_PJ1 = 0
 var count_PJ2 = 0
 var count_PJ1_like = 0
 var count_PJ2_like = 0
 var count_PJ1_dislike = 0
 var count_PJ2_dislike = 0



router.get('/project1', function(req, res, next) {
    count_PJ1 += 1;
    let result = []
    async function getComment() {   
        const Comment = mongoose.model('comments',commentSchema);
        const count_collection = await Comment.find().countDocuments();                      
        const data = await Comment.find();  
        for (let i = 0; i < data.length; i++ ){
            name = data[i]["name"];
            description =  data[i]["description"];
            result.push(name+" : "+description+"  ");
            console.log(name);
        }
        
        res.render('addblog', { title: 'Express' , database: result , count: count_PJ1 , count_collection:count_collection , count_PJ1_like: count_PJ1_like , count_PJ1_dislike: count_PJ1_dislike   });
    }
    getComment();  
  });



  router.get('/project2', function(req, res, next) {
    count_PJ2 += 1;
    let result = []
    async function getComment() {   
        const Comment = mongoose.model('111',commentSchema);
        const count_collection = await Comment.find().countDocuments();                      
        const data = await Comment.find();  
        for (let i = 0; i < data.length; i++ ){
            name = data[i]["name"];
            description =  data[i]["description"];
            result.push(name+" : "+description+"  ");
            console.log(name);
        }                                   
        res.render('project2', { title: 'Express' , database: result , count: count_PJ2 , count_collection:count_collection , count_PJ2_like: count_PJ2_like , count_PJ2_dislike: count_PJ2_dislike    });
    }
    getComment();  
  });



router.post('/project1',[
    check("name","please input your blog name").not().isEmpty(),
    check("description","please input your blog description").not().isEmpty(),
], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        let result = []
async function getComment() {   
    const Comment = mongoose.model('comments',commentSchema);
    const count_collection = await Comment.find().countDocuments();                      
    const data = await Comment.find();  
    for (let i = 0; i < data.length; i++ ){
        name = data[i]["name"];
        description =  data[i]["description"];
        result.push(name+" : "+description+"  ");
        console.log(name);
    }                                   
    console.log(errors);
    res.render('addblog',{errors:errors ,database: result  , count: count_PJ1 , count_collection:count_collection , count_PJ1_like: count_PJ1_like , count_PJ1_dislike: count_PJ1_dislike });
}

    getComment(); 
    }else{
        let result = []  
        async function createComment() {                                                                            // สร้าง collection และ เพิ่มค่าข้างใน                      
            const Comment = mongoose.model('comments',commentSchema);
            const count_collection = await Comment.find().countDocuments(); 
            const comment = Comment({
               name : req.body.name,
               description : req.body.description
            });
            const data1 = await comment.save();

            const data = await Comment.find();  
            for (let i = 0; i < data.length; i++ ){
                name = data[i]["name"];
                description =  data[i]["description"];
                result.push(name+" : "+description+"  ");
                console.log(name);
            }                            

            
            console.log(data1);
            res.render('addblog',{database: result , count: count_PJ1 , count_collection:count_collection+1 , count_PJ1_like: count_PJ1_like , count_PJ1_dislike: count_PJ1_dislike });
            
        }
        createComment();
        
        
    } 
    
    console.log(req.body.name);
    console.log(req.body.description);
  });



router.post('/project2',[
    check("name","please input your blog name").not().isEmpty(),
    check("description","please input your blog description").not().isEmpty(),
], function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        let result = []
async function getComment() {   
    const Comment = mongoose.model('111',commentSchema);
    const count_collection = await Comment.find().countDocuments();                      
    const data = await Comment.find();  
    for (let i = 0; i < data.length; i++ ){
        name = data[i]["name"];
        description =  data[i]["description"];
        result.push(name+" : "+description+"  ");
        console.log(name);
    }                                   
    console.log(errors);
    res.render('project2',{errors:errors ,database: result , count: count_PJ2 , count_collection:count_collection ,  count_PJ2_like: count_PJ2_like , count_PJ2_dislike: count_PJ2_dislike  });
}

    getComment(); 
    }else{
        let result = []  
        async function createComment() {                                                                            // สร้าง collection และ เพิ่มค่าข้างใน                      
            const Comment = mongoose.model('111',commentSchema);
            const count_collection = await Comment.find().countDocuments();  
            const comment = Comment({
               name : req.body.name,
               description : req.body.description
            });
            const data1 = await comment.save();

            const data = await Comment.find();  
            for (let i = 0; i < data.length; i++ ){
                name = data[i]["name"];
                description =  data[i]["description"];
                result.push(name+" : "+description+"  ");
                console.log(name);
            }                            

            
            console.log(data1);
            res.render('project2',{database: result ,count: count_PJ2 , count_collection:count_collection+1 ,  count_PJ2_like: count_PJ2_like  , count_PJ2_dislike: count_PJ2_dislike });
            
        }
        createComment();
        
        
    } 
    
    console.log(req.body.name);
    console.log(req.body.description);
  });


router.get('/like1', function(req, res, next) {
    
    res.render('addblog', { title: 'Express' , database: result , count: count_PJ1 , count_collection:count_collection , count_PJ1_like: count_PJ1_like , count_PJ1_dislike: count_PJ1_dislike });
  });

router.post('/like1', function(req, res, next) {
    
    let result = []
    async function getComment() {  
        count_PJ1_like += 1;
        const Comment = mongoose.model('comments',commentSchema);
        const count_collection = await Comment.find().countDocuments();                      
        const data = await Comment.find();  
        for (let i = 0; i < data.length; i++ ){
            name = data[i]["name"];
            description =  data[i]["description"];
            result.push(name+" : "+description+"  ");
            console.log(name);
        }
        
        res.render('addblog', { title: 'Express' , database: result , count: count_PJ1 , count_collection:count_collection , count_PJ1_like: count_PJ1_like , count_PJ1_dislike: count_PJ1_dislike  });
    }
    getComment();  
   
  });


router.get('/dislike1', function(req, res, next) {
    
    res.render('addblog', { title: 'Express' , database: result , count: count_PJ1 , count_collection:count_collection , count_PJ1_like: count_PJ1_like , count_PJ1_dislike: count_PJ1_dislike });
  });


router.post('/dislike1', function(req, res, next) {
    
    let result = []
    async function getComment() {  
        count_PJ1_dislike += 1;
        const Comment = mongoose.model('comments',commentSchema);
        const count_collection = await Comment.find().countDocuments();                      
        const data = await Comment.find();  
        for (let i = 0; i < data.length; i++ ){
            name = data[i]["name"];
            description =  data[i]["description"];
            result.push(name+" : "+description+"  ");
            console.log(name);
        }
        
        res.render('addblog', { title: 'Express' , database: result , count: count_PJ1 , count_collection:count_collection , count_PJ1_like: count_PJ1_like , count_PJ1_dislike: count_PJ1_dislike  });
    }
    getComment();  
   
  });




  router.get('/like2', function(req, res, next) {
    
    res.render('project2', { title: 'Express' , database: result , count: count_PJ2 , count_collection:count_collection , count_PJ2_like: count_PJ2_like , count_PJ2_dislike: count_PJ2_dislike });
  });


router.post('/like2', function(req, res, next) {
    console.log("sssssssssssssssssssssssssssssssssssssss")
    let result = []
    async function getComment() {  
        count_PJ2_like += 1;
        const Comment = mongoose.model('111',commentSchema);
        const count_collection = await Comment.find().countDocuments();                      
        const data = await Comment.find();  
        for (let i = 0; i < data.length; i++ ){
            name = data[i]["name"];
            description =  data[i]["description"];
            result.push(name+" : "+description+"  ");
            console.log(name);
        }
        
        res.render('project2', { title: 'Express' , database: result , count: count_PJ2 , count_collection:count_collection , count_PJ2_like: count_PJ2_like , count_PJ2_dislike: count_PJ2_dislike  });
    }
    getComment();  
   
  });



  router.get('/dislike2', function(req, res, next) {
    
    res.render('project2', { title: 'Express' , database: result , count: count_PJ2 , count_collection:count_collection , count_PJ2_like: count_PJ2_like , count_PJ2_dislike: count_PJ2_dislike });
  });


router.post('/dislike2', function(req, res, next) {
    
    let result = []
    async function getComment() {  
        count_PJ2_dislike += 1;
        const Comment = mongoose.model('111',commentSchema);
        const count_collection = await Comment.find().countDocuments();                      
        const data = await Comment.find();  
        for (let i = 0; i < data.length; i++ ){
            name = data[i]["name"];
            description =  data[i]["description"];
            result.push(name+" : "+description+"  ");
            console.log(name);
        }
        
        res.render('project2', { title: 'Express' , database: result , count: count_PJ2 , count_collection:count_collection , count_PJ2_like: count_PJ2_like , count_PJ2_dislike: count_PJ2_dislike  });
    }
    getComment();  
   
  });


module.exports = router;
