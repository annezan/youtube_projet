// server-express.js
const express = require('express');
const ytdl=require("ytdl-core");
const app   = express(); // initialize app

app.use(express.json());
app.use(express.static("public"));

// GET callback function returns a response message
app.get("/", function(request, response){
	response.sendFile(__dirname + "public/index.html");
});
app.get("/videoInfo",async function(request, response){
	const videourl=request.query.videourl;
	const info=await ytdl.getInfo(videourl);
	response.status(200).json(info);
});
app.get("/download",function(request,response){
	const videourl=request.query.videourl;
	const itag=request.query.itag;
	response.header("content-Disposition",'attachment;\ filename="video.mp4"');
	ytdl(videourl,{
		filter:format=>format.itag==itag
	}).pipe(response);
	
});
app.listen(5000);