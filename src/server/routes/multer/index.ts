import { Router } from 'express';
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import config from '../../config';

const router = Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {

//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// });

// const upload = multer({ storage })

aws.config.update({
    secretAccessKey: config.multer.secretAccessKey,
    accessKeyId: config.multer.accessKeyId
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'heathers-projects',
        key: (req, file, cb) => {
            cb(null, `${file.originalname}-${Date.now()}`)
        },
        acl: 'public-read'
    })
});

router.post('/', upload.single('avatar'), (req, res) => {
    console.log('req.file.location', req.file);
    console.log('req.body', req.body);
    res.json('Blogs Test');
})

export default router;