const fs = require("fs");
const Post = require("../models").post;
const User = require("../models").user;
const Comment = require("../models").comment;
const db = require("../models/index");
const jwt = require("jsonwebtoken");

// POST
//Créé un post
exports.createPost = async (req, res, next) => {
    const text = req.body.textContent;

    //recupérer userId
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    

    if (text == "") {
        return res.status(400).json({ error: "post vide" });
    }
    db.user
        .findOne({
            where: { id: userId },
        })
        .then((userFound) => {
            if (userFound) {
                const post = db.post.build({
                    textContent: req.body.textContent,
                    userId: userId,
                });
                post.save()
                    .then(() =>
                        res.status(201).json({message:"post crée"})
                    )
                    .catch((error) => { 
                        console.log(error);
                        res.status(400).json({
                            error: "Création du message échoué",
                        });
                    });
            } else {
                console.log(error);
                return res
                    .status(404)
                    .json({ error: "Utilisateur non trouvé" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: "Recherche de l'utilisateur échouée",
            });
        });
};

//GET
// Voir tout les message
exports.getAllPosts =  (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    db.post
        .findAll({
            order: [["createdAt", "DESC"]], //ordre date descendant
            include: [
                {
                    model: db.user,
                    attributes: ["lastName", "firstName", "avatar"],
                    as: "user",
                },
            ],
        })
        .then((postFound) => {
            if (postFound) {
                res.status(200).json(postFound);
            } else {
                res.status(404).json({ error: "Aucun message " });
            }
        })
        .catch((error) => {
            console.log(error),
                res.status(500).send({ error: "echec requête " });
        });
};


//PUT 
// Modifier un message
exports.modifyPost = (req, res, next) => {
    //recupéré userId
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    let postObject = {
        ...req.body,
    };

    console.log(postObject);

    db.post
        .findOne({
            where: { id: req.params.postId },
        })
        .then((postFound) => {
            if (postFound.userId === userId) {
                if (postFound) {
                    db.post
                        .update(postObject, {
                            where: { id: req.params.postId },
                        })
                        .then((post) =>
                            res.status(200).json({ message: "message modifié"})
                        )
                        .catch((error) => {
                            console.log(error);
                            res.status(400).json({
                                error: "Modification du message échoué",
                            });
                        });
                } else {
                    res.status(404).json({ error: "Aucun message trouvé :(" });
                }
            } else {
                res.status(403).json({
                    error: "Vous n'avez pas le droit de modifier ce message",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Modification du message échoué" });
        });
};

exports.getOnePost = (req, res, next) => {
    const id = req.params.id;
    db.post
    .findOne({
        attributes: ["id", "textContent"],
        where: { id: req.params.postId },
    })
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ error: "post non trouvé" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({id});
        });
};

//DELETE
// Supprimer un message
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    

    db.post
        .findOne({
            attributes: ["id", "userId"],
            where: { id: req.params.postId },
        })
        .then((postFound) => {
            if (postFound.userId == userId || isAdmin) {
                db.post
                    .destroy({
                        where: { id: req.params.postId },
                    })
                    .then(() =>
                        res.status(200).json({message:"post supprimé"})
                    )

                    .catch(() =>
                        res
                            .status(500)
                            .json({
                                error: "Suppression du post échouée; post non trouvé",
                            })
                    );
            } else {
                console.log(isAdmin);
                res.status(403).json({
                    error: "vous n'avez pas le droit de supprimer ce post",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Suppression du message échouée" });
        });
};
