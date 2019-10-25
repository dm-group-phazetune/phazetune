function editUserProf(req,res){
    const user_id = +req.params.id
    const {first_name, last_name, city, bio} = req.body
    const db = req.app.get('db')

    db.prof.editUserProfile(first_name, last_name, city, bio, user_id).then(() => {
        db.getUserPosts(req.session.user.username).then(info => {
            
            res.status(200).json(info)
        })
    })
}

function getUserProf(req,res){
    const db = req.app.get('db')

    db.prof.getUserProfile().then(user => {
        res.status(200).json(user)
    })

}


module.exports = {
    editUserProf,
    getUserProf
}