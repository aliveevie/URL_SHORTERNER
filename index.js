require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const validUrl = require('./url_functions/valid_url')
const isValidHostName = require('is-valid-hostname');
const isValidUrl = require('is-valid-url')
const dns = require('dns')
const mongoose = require('mongoose');
const models = require('./models/urls')
const app = express();
const url = require('url')
const shortId = require('shortid')



const urlMap = new Map()

app.use(bodyParser.urlencoded({ extended: false }))
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
let original_url;
app.post('/api/shorturl', (req, res) => {
    original_url = req.body.url
    const httpRegex = /^(http|https)(:\/\/)/;
if (!httpRegex.test(original_url)) {return res.json({ error: 'invalid url' })}
  if(validUrl.isUrlValid(original_url)){
    const hostname = new URL(original_url).hostname
    dns.lookup(hostname, (error) => {
      if(error){
        res.json({"error":"Invalid Hostname"})
      }else{
        let short_url = shortId.generate()
        urlMap.set(short_url, original_url)

        res.json({original_url:original_url, short_url:short_url})
        
      }
    })
  }else{
    res.json({ error: 'invalid url' })
  }



});

app.get("/api/shorturl/:short", (req, res) => {
      let short = req.params
      if(short){
        res.redirect(original_url)
      }
      

})




/*
mongoose.connect('mongodb+srv://ibrahim193:EVie1234@cluster0.wkkmuje.mongodb.net/?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

*/

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


