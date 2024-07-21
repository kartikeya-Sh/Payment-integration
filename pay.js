const express=require('express')
const Insta=require('instamojo-nodejs')
const bodyParser=require('body-parser')
const app=express()


app.use(express.static("./images"));
const API_KEY = "test_86a5ce32953e14afc7e8b1099c3";

const AUTH_KEY = "test_3a601f338918ff4a91e02f9de70";

Insta.setKeys(API_KEY,AUTH_KEY);
Insta.isSandboxMode(true);

app.use(bodyParser.urlencoded({extended:false}))
const PORT=process.env.PORT ||3000

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


app.post('/payment',(req,res)=>{
var name=req.body.name
var email=req.body.email
var amount=req.body.amount
console.log(name)
console.log(email)
console.log(amount)

var data = new Insta.PaymentData();

const REDIRECT_URL = "http://localhost:3000/success";

data.setRedirectUrl(REDIRECT_URL);
data.send_email = "True";
data.purpose = "Ngo";
data.amount = amount;
data.name = name;
data.email = email; // REQUIRED

Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
    } else {
      // Payment redirection link at response.payment_request.longurl
      console.log(response)
      res.sendFile(__dirname+"/pay.html")
      // res.send("Please check your email to make payment")
    }
  });


})

app.get('/success',(req,res)=>{
    res.send('Payment was sucessful please check your email')
})
app.listen(PORT,()=>{
    console.log('3000')
})