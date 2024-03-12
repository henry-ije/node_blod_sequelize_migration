const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads")

    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file))
    }
});

const fileFilter = (req, file, cb) => {
    if(file.minetype === "image/jpeg" || file.minetype === "image/png"){
        cb(null, true);
    }else {
        cb(new Error("Unsupported files"), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024,
    },
    fileFilter: fileFilter

});

module.exports = {
    upload:upload
}