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
    `SELECT * from comment WHERE post_id="${(comment.post_id)}"`
  );

  const data = helper.emptyOrRows(rows);

  return {
      data
    }
}

/* Créer un comment */
async function createComment(comment){
  const currentDate = new Date()
  const result = await db.query(
    `INSERT INTO comment (id, content, created_at, post_id)
    VALUES (1, '${comment.content}', '${currentDate}', '${comment.post_id}');`
  )

  let message = 'Error in creating comment';
  
  if (result.affectedRows) {
    message = 'Comment created successfully';
  }

  return {message};
}


module.exports = {
    getComments,
    getComment,
    createComment
}