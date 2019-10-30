

const genreType = async function (req, res) {
    console.log('hit')
    const db = req.app.get('db')
    const {genre} = req.query;
    const genres = await db.genre.getGenrePosts(genre);
    console.log(genres, genre)
    res.status(200).json(genres);
    
}
// async function genrePost (req, res) {
//     const db = req.app.get('db')
//     const post_id = +req.params.post_id;
//     const genrePosts = await db.genre.genrePosts(post_id)
//     res.status(200).json(genrePosts)
// }

module.exports = {
    genreType
    // genrePost

}