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

/* Créer un post */
async function createPost(post){
  const currentDate = new Date()
  const result = await db.query(
    `INSERT INTO posts (id, title, content, created_at, user_id)
    VALUES (1, '${post.title}', '${post.content}', '${currentDate}' , '${post.user_id}');`
  )

  let message = 'Error in creating Post';
  
  if (result.affectedRows) {
    message = 'Post created successfully';
  }

  return {message};
}

module.exports = {
    getPosts,
    createPost
}