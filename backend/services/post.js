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
  const currentDate = new Date()
  const id = getLastId()
  const result = await db.query(
    `INSERT INTO posts (id, titre, contenu, date_de_publication, nom_utilisateur)
    VALUES ('${id+1}','${post.title}', '${post.content}', '${currentDate}' , '${post.name}');`
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


module.exports = {
    getPosts,
    getPost,
    createPost
}