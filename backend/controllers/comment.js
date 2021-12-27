const fs = require("fs");

const comment = require("../models").Comment;

/*Creation post*/

exports.createComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.post);
    console.log(req.body);
    console.log(commentObject);
    delete comment.Object.id;
    const comment = new Post({
        ...commentObject /*... opérateur spread permet copie tous les élèments de req.body*/
        
    });
    console.log(comment);
    comment
        .save()
        .then(() => res.status(201).json({ message: "commentaire crée!" }))
        .catch((error) => res.status(400).json({ error }));
};

/* retourne le commentaire correspondant à l'Id fourni*/
exports.getOneComment = (req, res, next) => {
    Post.findOne({
        id: req.params.id,
    })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(400).json({ error }));
};


/*Supprime le comment correspondant à l'Id fourni*/
exports.deleteComment = (req, res, next) => {
    Post.findOne({ id: req.params.id })
        .then((comment) => {
                Post.destroy({ id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: "post supprimé !" })
                    )
                    .catch((error) => res.status(400).json({ error }));
            ;
        })
        .catch((error) => res.status(500).json({ error }));
};


/*Renvoie le tableau de tous les posts crés*/
exports.getAllComments = (req, res, next) => {
    Comment.find()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({ error }));
};
