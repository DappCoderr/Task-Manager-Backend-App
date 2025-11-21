 import express from "express";
  const app = express()

 const PORT = 7777

 app.listen(PORT, () => {
    console.log("Server started and listening on PORT: ", PORT)
 })