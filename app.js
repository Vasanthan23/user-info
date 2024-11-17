import express from 'express';
import cors from 'cors';
import dbConnect from './dbConfig.js';
import authRoutes from "./routes/auth.js"
// import http from 'http';

dbConnect();
// const server = http.createServer(function(req, resp){
// resp.writeHead(200, {'content-type': 'test/html'})
// bp 
//  resp.write('Hello Node')
//  resp.end()

// })

// server.listen(port, function(error){
//     if(error){
//         console.log('something went wrong', error)
//     }
//     else{
//         console.log('server is listening on port' + port)
//     }
// })

const port = 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.listen(port, () => console.log(`Server running on port ${port}`));


