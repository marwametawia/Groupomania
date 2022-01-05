const fs = require("fs");

const Comment = require("../models").comment;

const jwt = require("jsonwebtoken");
const db = require('../models/index');

// POST
// Créer un commentaire
exports.createComment = (req, res, next) => {
    //recupéré userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    db.Post.findOne({
        where: { id: req.params.postId }
    })
    .then(postFound => {
        if(postFound) {
            const commentaire = db.Commentaire.build({
                text: req.body.text,
                postId: req.params.postId,
                userId: userId
            })
            commentaire.save()
                .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ error: 'Création du Commentaire échoué' })
                });
        } else {
            return res.status(404).json({ error: 'Aucun message publié :('})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Création du Commentaire échoué' })
    });
}

//GET
exports.getOneComment = (req, res, next) => {
    Comment.findOne({
        id: req.params.commentId,
    })
        .then((comment) => res.status(200).json(comment))
        .catch((error) => res.status(400).json({ error }));
};

// Voir les commentaires
exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        order: [['updatedAt', "ASC"]],
        where: { commentId: req.params.commentId },
        include: [{
            model: db.User,
            attributes: [ 'lastName', 'firstName', 'avatar' ],
            as: "User"
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
    console.log('ici')
    db.Comment.findOne({
        attributes: ['id'],
        where: { id: req.params.commentId }
    })
    .then(commentFound => {
        if(commentFound) {
            db.Comment.destroy({
                where: { id: req.params.commentId }
            })
            .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: 'Suppression du commentaire échoué' })
            });

        } else {
            return res.status(404).json({ error: 'Aucun commentaire publié :('})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Suppression du commentaire échoué' })
    });
}