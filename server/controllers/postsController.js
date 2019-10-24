//add post
async function addPost(req, res) {
    const {title, genre, audio_url} = req.body;
    const {user_id} = req.session.user;
    const db = req.app.get("db");
    await db.posts.addPost(title, genre, audio_url, user_id)
        res.sendStatus(200);
    
}

//export all
module.exports ={
    addPost
}