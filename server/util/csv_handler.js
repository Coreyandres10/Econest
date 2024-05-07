const multer=require('multer')

const memoryStorage=multer.memoryStorage();
const filefilter=(req,file,cb)=>{
    console.log(file)
    if (file.originalname.endsWith('.csv')) {
        // If it's a CSV file, accept it
        cb(null, true);
    } else {
        // If it's not a CSV file, reject it
        cb({
            message:"File uploaded is not a csv file"
        },false);
    }
}
const csvmulter=multer({
    storage:memoryStorage,
    fileFilter:filefilter
})
module.exports=csvmulter
