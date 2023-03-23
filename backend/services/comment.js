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
  const currentDate = new Date()
  const id = getLastId()
  const result = await db.query(
    `INSERT INTO comment (id, contenu, date_de_commentaire, nom_utilisateur, post_id)
    VALUES ('${id + 1}', '${comment.content}', '${currentDate}','${comment.name}', '${comment.post_id}');`
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

module.exports = {
    getComments,
    getComment,
    createComment
}