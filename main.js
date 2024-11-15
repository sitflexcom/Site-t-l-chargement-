console.log('Hello World!');
document.getElementById('upload-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData();
  formData.append('file', document.getElementById('file-input').files[0]);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Fichier téléchargé avec succès!');
      fetchFiles(); // Recharger la liste des fichiers
    } else {
      alert('Erreur lors du téléchargement du fichier.');
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
    alert('Erreur lors du téléchargement du fichier.');
  });
});

function fetchFiles() {
  fetch('/files')
    .then(response => response.json())
    .then(data => {
      const filesDiv = document.getElementById('files');
      filesDiv.innerHTML = '';
      data.files.forEach(file => {
        const fileDiv = document.createElement('div');
        fileDiv.classList.add('file');
        fileDiv.innerHTML = `
          <h3>${file.name}</h3>
          <p><a href="${file.url}" download>Télécharger</a></p>
        `;
        filesDiv.appendChild(fileDiv);
      });
    })
    .catch(error => console.error('Erreur:', error));
}

// Appeler fetchFiles lors du chargement de la page
document.addEventListener('DOMContentLoaded', fetchFiles);