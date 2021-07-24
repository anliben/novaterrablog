const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


module.exports = {
    dest: path.resolve(__dirname, '..','public', 'images'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..','public', 'images'));
        },
        filename: (req, file, cb) =>{
            const fileName = `${uuidv4()}-${file.originalname}`
            cb(null, fileName);
        }
    }),
    limits: {
        filezise: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) =>{
        const allowedMimes = [
            'image/jpg',
            'image/gif',
            'image/webp',
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ];
        if (allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error('Invalid File Type'))
        }
    }
}

