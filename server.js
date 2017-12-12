 const express = require('express');
 const app = express();

 const PORT = process.env.PORT || 8080;

 app.get('/api/*', (req, res) => {
   res.status(200).json({ok: true}).end();
 });

 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

 module.exports = {app};