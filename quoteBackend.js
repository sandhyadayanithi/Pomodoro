import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';
import http from 'http';

dotenv.config();

const URL=process.env.URL;
const PORT=process.env.PORT;

const agent = new https.Agent({
  rejectUnauthorized: false, // <-- ignore expired/invalid certs
});

const server=http.createServer(async (req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if(req.url==='/quote'){
    try{
      const response=await axios.get(URL,{ httpsAgent: agent });
      const quote=response.data;
      res.setHeader('Content-Type','application/json');
      res.write(JSON.stringify(quote));
      console.log("Success");
      res.end();
    }
    catch(err){
      console.log(err);
    }
  }
  else{
    res.setHeader('Content-Type','application/json');
    res.write(JSON.stringify({message:"Invalid url."}));
    res.end();
  }
  
});

server.listen(PORT,()=>{
  console.log("Server running...")
});