const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const port=process.env.PORT || 3000;
const app=express();
app.use(bodyparser.urlencoded({extended:false}));

app.get("/",function(req,res){

  res.sendFile(__dirname +"/index.html");

});

 app.post("/",function(req,res){
   var apikey="02d6036a26cef93137771a2a6ff47489";
  var unit="metric";
  var city=req.body.cityname;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+apikey;


  https.get(url,function(response){
    if(response.statusCode!==200)
    {
      res.sendFile(__dirname +"/failure.html");
    }


   else{
    response.on("data",function(data){
      const wheatherdata=JSON.parse(data);
      const temp=wheatherdata.main.temp;
      const wheather=wheatherdata.weather[0].description;

      const icon=wheatherdata.weather[0].icon;
      const  imageurl="http://openweathermap.org/img/wn/" +icon+"@2x.png";

     res.write("<p>your city "+ city+" wheather description is "+wheather+"</p>");
     res.write("<h1>The temprature in " +city+ " have "+temp+" degree celcius</h1>");
     res.write("<img src=" +imageurl + ">");
     res.send();
     })
   }
})

})
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(port,function(){
  console.log("your local server host on port 3000");
})
