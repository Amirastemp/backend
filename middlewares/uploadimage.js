const path   = require('path')
const multer =require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
var uploadimage= multer({
    storage:storage,

})
module.exports=uploadimage