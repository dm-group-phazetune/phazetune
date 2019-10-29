

async function genreType (req, res) {
    const db = req.app.get('db')
    const {genre} = req.query;
    const genres = await db.genre.getGenrePosts(genre);
    res.status(200).json(genres);
    
}

module.exports = {
    genreType

}