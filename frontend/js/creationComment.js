//Récupération de l'URL pour spliter le résultat avec "="
var url = document.location.href; 
var query = url.split("=");
const urlFetchPost = `http://localhost:3000/api/getPost?id=${query[1]}`;
const urlFetchComment = `http://localhost:3000/api/getComment?id=${query[1]}`;

const postDiv = document.getElementById('post');

//AFFICHAGE DU POST
fetch(urlFetchPost)
  .then(response => response.json())
  .then(data => {
    const comment = data.data[0];
    postDiv.innerHTML = `
      <h2>${comment.titre}</h2>
      <p>${comment.contenu}</p>
      <p>Date de publication : ${comment.date_de_publication}</p>
      <p>Nom d'utilisateur : ${comment.nom_utilisateur}</p>
    `;
  })
  .catch(error => {
    console.error(error);
  });

//AFFICHAGE DES COMMENTAIRES DU POST
fetch(urlFetchComment)
.then(response => response.json())
.then(data => {
  const commentList = document.getElementById('comment');
  const comments = data.data;

  if (comments.length > 0) {
    const ul = document.createElement('ul');
    commentList.appendChild(ul);

    comments.forEach(comment => {
      const li = document.createElement('li');
      li.innerText = `${comment.nom_utilisateur} - ${comment.contenu}`;
      ul.appendChild(li);
    });
  } else {
    commentList.innerText = 'Aucun commentaire trouvé.';
  }
})
.catch(error => {
  console.error(error);
});

//ENVOIE DU FORMULAIRE
function submitForm() {
    const content = document.getElementById("content").value;
    const username = document.getElementById("username").value;
  
    const data = {
      content: content,
      name: username,
      post_id: query[1]
    };
  
    fetch('http://localhost:3000/api/createComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response);
      alert("Commentaire bien envoyé !")
      location.reload();
    })
    .catch(error => {
      console.error(error);
    });
  }