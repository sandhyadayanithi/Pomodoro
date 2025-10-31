import axios from 'axios';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const URL=process.env.URL;
const PORT=process.env.PORT || 8000;

const server=http.createServer(async (req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if(req.url==='/quote'){
    try{
      const response=await axios.get(URL);
      const quote=response.data;
      res.setHeader('Content-Type','application/json');
      res.write(JSON.stringify(quote));
      res.end();
    }
    catch(err){
      console.log(err);
    }
  }
  else{
    console.log("Invalid url!");
  }
});

server.listen(PORT,()=>{
  console.log("Server running...")
});