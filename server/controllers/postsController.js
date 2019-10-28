//add post
async function addPost(req, res) {
    const {title, genre, audioUrl} = req.body;
    const {user_id} = req.session.user;
    const db = req.app.get("db");
    await db.posts.addPost(title, genre, audioUrl, user_id)
        res.sendStatus(200);
    
}
async function getPastPosts(req, res) {
    const db = req.app.get('db');
    const posts = await db.posts.getPastPosts(req.session.user.user_id)
    res.status(200).json(posts);
}
async function getAllPosts(req, res) {
    const db = req.app.get('db');
    const allPosts = await db.posts.getAllPosts(req.session.users.user_id)
    res.status(200).json(allPosts);
}

//export all
module.exports ={
    addPost,
    getPastPosts,
    getAllPosts
}