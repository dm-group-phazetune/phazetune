function editUserProf(req,res){
    const user_id = req.session.user
    const {first_name, last_name, city, photo, bio } = req.body
    const db = req.app.get('db')

    db.prof.editUserProfile(first_name, last_name, city, photo, bio, user_id).then((info) => {
        res.status(200).json(info)
    })
}

function getUserProf(req,res){
    const user_id = +req.params.id
    const db = req.app.get('db')

    db.prof.getUserProfile(user_id).then(user => {
        res.status(200).json(user)
    })

}


module.exports = {
    editUserProf,
    getUserProf
}