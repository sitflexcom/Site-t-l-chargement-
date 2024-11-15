const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(fileUpload());

let files = [];

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ success: false, message: 'No files were uploaded.' });
  }

  const uploadedFile = req.files.file;
  const uploadPath = __dirname + '/public/uploads/' + uploadedFile.name;

  uploadedFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    files.push({ name: uploadedFile.name, url: '/uploads/' + uploadedFile.name });
    res.send({ success: true });
  });
});

app.get('/files', (req, res) => {
  res.send({ files });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});