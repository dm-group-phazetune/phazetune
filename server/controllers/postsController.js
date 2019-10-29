//add post
async function addPost(req, res) {
  const { title, genre, audioUrl } = req.body;
  const { user_id } = req.session.user;
  const db = req.app.get("db");
  await db.posts.addPost(title, genre, audioUrl, user_id);
  res.sendStatus(200);
}
async function getPastPosts(req, res) {
  const db = req.app.get("db");
  const posts = await db.posts.getPastPosts(req.session.user.username);
  res.status(200).json(posts);
}
async function getAllPosts(req, res) {
  const db = req.app.get("db");
  const allPosts = await db.posts.getAllPosts(req.session.user.user_id);
  res.status(200).json(allPosts);
}

async function getUsersPosts(req, res) {
  const db = req.app.get("db");
  const { username } = req.params;
  const posts = await db.posts.getUsersPosts(username);
  res.status(200).json(posts);
}

async function editPost(req, res) {
  const db = req.app.get("db");
  const post_id = +req.params.post_id;
  const { user_id } = req.session.user;
  const { title, genre } = req.body;
  console.log(req.body, post_id, user_id);

  const editedPost = await db.posts.editPost([title, genre, post_id, user_id]);
  res.status(200).json(editedPost);
}

async function deletePost(req, res) {
  const db = req.app.get("db");
  const post_id = +req.params.post_id;
  const { user_id } = req.session.user;
  const deletedPost = await db.posts.deletePost([post_id, user_id]);
  res.status(200).json(deletedPost);
}

//export all
module.exports = {
  addPost,
  getPastPosts,
  getAllPosts,
  getUsersPosts,
  editPost,
  deletePost
};
