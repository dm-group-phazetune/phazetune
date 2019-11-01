// async function followUser(req, res) {
//   const db = req.app.get("db");

//   // user_id is follow_id
//   const { user_id } = req.session.user;
//   const { username } = req.params;

//   const follow = await db.follow.followUser([user_id, username]);
//   res.status(200).json(follow);
// }

// async function unfollowUser(req, res) {
//   const db = req.app.get("db");

// }

const followUser= async ( req, res) => {
  const db = req.app.get("db");
  const { user_id } = req.session.user;
  const { username } = req.params;

  db.checkFollow([user_id, username]).then(friends => {
    if (friends.length > 0) {
      db.follow.unfollowUser([user_id, username]).then( () => {
        res.json({ followed:false});
      });
    } else {
      db.follow.followUser([user_id, username]).then( () => {
        res.json({ followed:true});
      });
    }
  }).catch(error => console.log(error));
}

const getFollowPosts = async (req, res, next) => {
  const db = req.app.get("db");
  const { user_id } = req.session.user;
  const results = await db.follow.getFollowingPosts([user_id]);
  res.status(200).json(results);
};


module.exports = {
  followUser,
  // unFollowUser,
  getFollowPosts
};
