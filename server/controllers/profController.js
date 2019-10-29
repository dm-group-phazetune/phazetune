async function editUserProf(req, res) {
  const db = req.app.get("db");
  const user_id = req.session.user;
  const { first_name, last_name, city, photo, bio } = req.body;

  const editedProfile = db.prof.editUserProfile([
    first_name,
    last_name,
    city,
    photo,
    bio,
    user_id
  ]);
  res.status(200).json(editedProfile);
}

async function getUserProf(req, res) {
  const db = req.app.get("db");
  const { username } = req.params;

  const user = await db.prof.getUserProfile(username);
  const posts = await db.posts.getUsersPosts(username);

  res.status(200).json([user, posts]);
}

module.exports = {
  editUserProf,
  getUserProf
};
