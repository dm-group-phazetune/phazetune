async function followUser(req, res) {
  const db = req.app.get("db");

  // user_id is follow_id
  const { user_id } = req.session.user;
  const { username } = req.params;

  const follow = await db.follow.followUser([user_id, username]);
  res.status(200).json(follow);
}

async function unfollowUser(req, res) {
  const db = req.app.get("db");
}

module.exports = {
  followUser,
  unfollowUser
};
