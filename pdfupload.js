const express=require("express")
const AWS = require('aws-sdk');
const fs = require('fs');
const mysql = require("mysql");
const cors=require("cors")
const app = express();
app.use(express.json());
app.use(cors())

// const pool=createPool({
//     host: "127.0.0.1",
//     port: 3036,
//     user: "admin_simandhar_internal",
//     password: "Jw224j$z",
//     database: "simandhar_internal_db",
//     connectionLimit:10,

// })

// pool.query('/',(err,result)=>{
//     if(err){
//         return console.log(err)
//     }
//     return console.log("Connected to Database")
// })
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "admin_simandhar_internal",
    password: "Jw224j$z",
    database: "simandhar_internal_db",
  });
  
  db.connect(function (err) {
    if (err) {
      console.log("Error connecting to Db" + err.stack);
      return;
    }
    console.log("Connection established");
  }); 

app.listen(3000)

const AWSCredentials = {
    accessKey: 'AKIA36ASJN7RA3D6VGJ4',
    secret: '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',
    bucketName: 'simandhar-edu-assets/Evaluations/'
};

const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret
});





app.post("/query/", async (request, response) => {
    const { fullname, emailaddress, phonenumber, course, media, textvalue } =
      request.body; 

      const uploadToS3 = (media) => {
        // Read content from the file
        const fileContent = fs.readFileSync(media);
    
        // Setting up S3 upload parameters
        const params = {
            Bucket: AWSCredentials.bucketName,
            Key: media,
            Body: fileContent
        };
    
        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });
    };
    
    uploadToS3(`${media}`); 




    const addUserQuery = `
        INSERT INTO query_page( fullname,emailaddress,phonenumber,course,image,textvalue)
        VALUES(
            '${fullname},
            '${emailaddress}',
            '${phonenumber}',
            '${course}',
            '${media}',
            '${textvalue}'
        );
      `;
    const dbResponse = await db.run(addUserQuery);
    response.send("New Query Created");
    response.status(200);
  });