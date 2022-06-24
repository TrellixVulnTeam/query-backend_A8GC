import express from "express"
import { generateUploadURL } from "./s3.mjs"


const app = express()



app.post('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})

app.listen(8080, () => console.log("listening on port 8080"))