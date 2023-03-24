const listOfPost = document.getElementById("listOfPost")
console.log(new Date())

//AFFICHAGE DES POSTS
fetch("http://localhost:3000/api/getPosts")
  .then(response => response.json())
  .then(data => {
    const listPost = document.getElementById('listPost');
    data.data.forEach(post => {
        const postContainer = document.createElement('div');
        const title = document.createElement('h2');
        const content = document.createElement('p');
        const user = document.createElement('p');
        const date = document.createElement('p');
        const button = document.createElement('button');
        const br = document.createElement('br');

        title.innerText = post.titre;
        content.innerText = post.contenu;
        user.innerText = `by ${post.nom_utilisateur}`;
        date.innerText = new Date(post.date_de_publication).toLocaleString();
        button.innerText = "Voir les commentaires"
        button.addEventListener('click', () => {
          window.location.href = `creationComment.html?id=${post.id}`;
        });

        postContainer.appendChild(title);
        postContainer.appendChild(content);
        postContainer.appendChild(user);
        postContainer.appendChild(date);
        postContainer.appendChild(button);
        postContainer.appendChild(br);

        listPost.appendChild(postContainer);
    });
  })
  .catch(error => {
    console.error(error);
  });

function submitForm() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const username = document.getElementById("username").value;
  
    const data = {
      title: title,
      content: content,
      name: username
    };
  
    fetch('http://localhost:3000/api/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response);
      alert("Post bien envoyé !")
      location.reload();
    })
    .catch(error => {
      console.error(error);
    });
  }