// DOTENV
require('dotenv').config()

// EXPRESS
const express = require('express')
const app = express()
app.use(express.static('public'))

// CHALK - Pretty console colors! 
const chalk = require('chalk');

// CLOUDINARY
cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

// MULTER
const multer = require('multer');
const upload = multer();
const type = upload.single('imgUpload');

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/upload', type , (req, res) => {
    console.log(req.file);
    cloudinary.v2.uploader.upload_stream(
        (error, result) => {
            console.log(result)
            if (result.url)
                res.send({url: result.url, width: result.width, height: result.height, format: result.format});
        }
    ).end(req.file.buffer);

});

app.listen(4000, () => console.log(chalk.black.bgGreen.bold('App listening on port 4000!')));