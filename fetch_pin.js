const https = require('https');

https.get('https://pin.it/4rz7Wohgm', (res) => {
  console.log('Location:', res.headers.location);
});
