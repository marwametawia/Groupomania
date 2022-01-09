const fs = require("fs");

const Comment = require("../models").comment;

const jwt = require("jsonwebtoken");
const db = require('../models/index');

// POST
// Créer un commentaire
exports.createComment = async (req, res, next) => {
    //recupéré userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const postId = req.params.postId;
 
     db.post
    .findOne({
        where: { id: postId }}
    ).then(postFound => {
        if(postFound) {
            let comment = db.comment.build({
                textContent: req.body.textContent,
                postId: req.params.postId,
                userId: userId
            })
            comment.save()
                .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ error: 'Création du Commentaire échouée' })
                });
        } else {
            return res.status(404).json({ message: "post non trouvé"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(console.log(postId))
    });
}
//GET


// Voir les commentaires
exports.getAllComments = (req, res, next) => {
    db.comment.findAll({
        order: [['updatedAt', "ASC"]],
        where: { postId: req.params.postId },
        include: [{
            model: db.user,
            attributes: [ 'lastName', 'firstName' ],
            as: "user"
        }]
    })
    .then(commentFound => {
        if(commentFound) {
            res.status(200).json(commentFound);
            console.log(commentFound);
        } else {
            res.status(404).json({ error: 'Aucun commentaire publié :(' });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ error: 'Recherche du commentaire échoué' });
    });
}

//DELETE
// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userIdd = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    

    db.comment
        .findOne({
            attributes: ["id", "userId"],
            where: { id: req.params.commentId },
        })
        .then((commentFound) => {
            
            if ((commentFound.userId == userIdd) || isAdmin) {
                db.comment
                    .destroy({
                        where: { id: req.params.commentId },
                    })
                    .then(() =>
                        res.status(200).json({message:"commentaire supprimé"})
                    )

                    .catch(() =>
                        res
                            .status(500)
                            .json({
                                error: "Suppression du comment échouée; comment non trouvé",
                            })
                    );
            } else {
                console.log(isAdmin);
                res.status(403).json({
                    error: "vous n'avez pas le droit de supprimer ce comment",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Suppression du commentaire échouée" });
        });
};
