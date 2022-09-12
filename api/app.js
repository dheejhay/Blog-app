// requring express
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser');

// creating an app
const app = express();
app.use("/public", express.static('public'));
app.use(express.json())
app.use(
    express.urlencoded({
      extended: false,
    })
  )
  let corsOptions = {
    origin: "http://localhost:3000",
    credentials:true
  };
app.use(cors(corsOptions))
app.use(cookieParser());

const blogRoute = require('./src/routes/blogRoute');
app.use('/api/blog/posts', blogRoute)

const userRoute = require('./src/user/routes/userRoute')
app.use('/api/blog/users', userRoute)

//setting a port
const PORT = process.env.port || 5506
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})