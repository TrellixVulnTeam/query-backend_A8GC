import express from "express"
import { generateUploadURL } from "./s3.mjs"
const cors = require("cors");

const app = express()
app.use(express.json());
app.use(cors());


app.post('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})

app.listen(8080, () => console.log("listening on port 8080"))