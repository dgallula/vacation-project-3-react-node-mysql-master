module.exports.loggedUser = (req, res, next) => {
    if (req.session.username) {
        next()
    }else {
        res.status(401).send({err: "Its only for logged users"})
    }
}