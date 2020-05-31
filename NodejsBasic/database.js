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

 const Comment = mongoose.model('111',commentSchema);
//  async function createComment() {   // สร้าง collection และ เพิ่มค่าข้างใน
//      const comment = Comment({
//         name : "mom",
//         description : "how are you 1111"
//      });
//      const data = await comment.save();
//      console.log(data);
//  }
//  createComment();


// async function getComment() {   // เรียกข้อมูลมาแสดง
//     const count = await Comment.find().countDocuments();                             // .countDocuments() คือ นับจำนวน document ที่ได้จากการคิวรี
//     const data = await Comment.find();  
//     for (let i = 0; i < data.length; i++ ){
//         name = data[i]["name"]
//         console.log(name);
//     }                                   
    
// }

// getComment();



// async function deleteComment() {   // ลบข้อมูล 1 ตัว แบบไม่มีเงื่อนไข
//     const data = await Comment.deleteOne()
//     console.log(data);
// }
// deleteComment();


// async function deleteComment(name1) {   // ลบข้อมูล 1 ตัว แบบมีเงื่อนไข สามารถลบเงื่อนไขนี้ได้หลายตัว
//     const data = await Comment.deleteOne(
//     {
//          name: name1,
//     })
//     console.log(data);
// }
// deleteComment("สวัสดีครับ");


async function deleteComment() {   // ลบข้อมูล ทั้งหมดใน collection
    const data = await Comment.deleteMany()
    console.log(data);
}
deleteComment();



// async function updateComment(Name) {   // update ข้อมูล 1 ตัว
//     const data = await Comment.findOne({name:Name});
//     data.description = "what ..."
//     data.save();
//     console.log(data);

// }
// updateComment("mom");
