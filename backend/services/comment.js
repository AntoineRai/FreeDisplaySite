const db = require('./db');
const helper = require('../helper');

const config = require('../config');

/* Renvoie la liste des tous les comments */
async function getComments(){
  const rows = await db.query(
    `SELECT * FROM comment`
    );

  const data = helper.emptyOrRows(rows);

  return {
      data
    }
}

/* Renvoie un post en fonction des posts */
async function getComment(comment){
  const rows = await db.query(
    `SELECT * from comment WHERE post_id="${(comment)}"`
  );

  const data = helper.emptyOrRows(rows);

  return {
      data
    }
}

/* Créer un comment */
async function createComment(comment){
  const currentDate = getDate()
  const id = getLastId()
  const result = await db.query(
    `INSERT INTO comment (id, contenu, date_de_commentaire, nom_utilisateur, post_id)
    VALUES ("${id + 1}", "${comment.content}", "${currentDate}", "${comment.name}", "${comment.post_id}");`
  )

  let message = 'Error in creating comment';
  
  if (result.affectedRows) {
    message = 'Comment created successfully';
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
    getComments,
    getComment,
    createComment
}