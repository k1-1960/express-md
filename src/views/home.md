[bg] #2E7D32
[font-color] white
# Hola
## Holaaaaa

> $ npm i express-md

+++
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('XD');
});

app.listen(3030, () => console.log('Listening port 3030.'));
---