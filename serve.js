var express = require('express');
var app = express();

app.use(express.static(__dirname.toString()));

app.listen(3000, function() {
  console.log('listening on port 3000');
});


// app.get('/set', function (req, res) {
//   res.sendFile('/set.html')
// })
// app.get('/', function (req, res) {
//   res.sendFile('index.html')
// })

