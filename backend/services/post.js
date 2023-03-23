const db = require('./db');
const helper = require('../helper');

const config = require('../config');

/* Renvoie la liste des tous les posts */
async function getPosts(){
  const rows = await db.query(
    `SELECT * FROM posts`
    );

  const data = helper.emptyOrRows(rows);

  return {
      data
    }
}

/* Renvoie la liste d'un post*/
async function getPost(post){
  const rows = await db.query(
    `SELECT * FROM posts WHERE id = ${post}`
    );

  const data = helper.emptyOrRows(rows);

  return {
      data
    }
}

/* Créer un post */
async function createPost(post){
  const currentDate = getDate()
  const id = getLastId()
  const result = await db.query(
    `INSERT INTO posts (id, titre, contenu, date_de_publication, nom_utilisateur)
    VALUES ("${id+1}","${post.title}", "${post.content}", "${currentDate}" , "${post.name}");`
  )

  let message = 'Error in creating Post';
  
  if (result.affectedRows) {
    message = 'Post created successfully';
  }

  return {message};
}

async function getLastId() {
  const result = await db.query(
    `SELECT id FROM posts ORDER BY id DESC LIMIT 1`
  );
  
  if (result.length) {
    return result[0].id;
  } else {
    return 0;
  }
}

function getDate(){
  const date = new Date();

  // Utilisez toLocaleString pour récupérer une version formatée de la date et de l'heure
  const formattedDate = date.toLocaleString();

  // Extraire les différentes parties de la chaîne de caractères formatée
  const day = formattedDate.slice(0, 2);
  const month = formattedDate.slice(3, 5);
  const year = formattedDate.slice(6, 10);
  const time = formattedDate.slice(12, 20);

  // Créer la chaîne de caractères finale au format "YYYY-MM-DD HH:MM:SS"
  const formattedString = `${year}-${month}-${day} ${time}`;

  return formattedString
}


module.exports = {
    getPosts,
    getPost,
    createPost
}