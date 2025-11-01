import axios from 'axios';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const URL=process.env.URL;
const PORT=process.env.PORT || 8000;

const agent = new https.Agent({
  rejectUnauthorized: false
});

const fallbackQuotes = [
  { content: "Stay curious", author: "Albert Einstein" },
  { content: "Small steps create big waves", author: "Unknown" },
  { content: "Innovation starts from discomfort", author: "Brene Brown" },
  { content: "The best way to predict the future is to create it", author: "Peter Drucker" },
  { content: "Do what you can, with what you have, where you are", author: "Theodore Roosevelt" },
  { content: "Success is not final, failure is not fatal: It is the courage to continue that counts", author: "Winston Churchill" },
  { content: "Dream big and dare to fail", author: "Norman Vaughan" },
  { content: "Action is the foundational key to all success", author: "Pablo Picasso" },
  { content: "You miss 100% of the shots you don’t take", author: "Wayne Gretzky" },
  { content: "Believe you can and you're halfway there", author: "Theodore Roosevelt" }
];

const server=http.createServer(async (req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if(req.url==='/quote'){
    try{
      const response=await axios.get(URL, { httpsAgent: agent });
      const quote=response.data;
      res.setHeader('Content-Type','application/json');
      res.write(JSON.stringify(quote));
      res.end();
    }
    catch(err){
      console.log(err);
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      res.setHeader('Content-Type','application/json');
      res.write(JSON.stringify(randomQuote));
      res.end();
    }
  }
  else{
    console.log("Invalid url!");
  }
});

server.listen(PORT,()=>{
  console.log("Server running...")
});