const User = require("../models").user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models/index");

// POST
//Créé un user
exports.signup = (req, res, next) => {
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let email = req.body.email;
    let password = req.body.password;
    let isAdmin= req.body.isAdmin;
    //Champs complet
    if (
        lastName == null ||
        lastName == "" ||
        firstName == null ||
        firstName == "" ||
        email == null ||
        email == "" ||
        password == null ||
        password == ""
    ) {
        return res
            .status(400)
            .json({ error: "Merci de remplir tous les champs" });
    }
    //verifier si l'user existe dans la BDD
    db.user.findOne({
        where: {
            
            email: email,
        },
    })
        .then((userExist) => {
            if (!userExist) {
                bcrypt
                    .hash(req.body.password, 10)
                    .then((hash) => {
                        const user = db.user.build({
                            lastName: lastName,
                            firstName: firstName,
                            email: email,
                            password: hash,
                            isAdmin: isAdmin,
                            
                        });
                        user.save()
                            .then(() =>
                                res
                                    .status(201)
                                    .json({
                                        message:
                                            "le compte a été créé avec succès",
                                    })
                            )
                            .catch((error) => {
                                console.log(error);
                                res.status(400).json({
                                    error: "Création du compte:échouée",
                                });
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({
                            error: "Création du compte:échouée",
                        });
                    });
            } else {
                console.log(error);
                return res.status(404).json({ error: "user déjà inscrit" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Création du compte échouée" });
        });
};

//Se connecter
exports.login = (req, res, next) => {
    

    db.user.findOne({
        where: { email: req.body.email },
    })

        .then((user) => {
            if (user) {
                bcrypt
                    .compare(req.body.password, user.password)

                    .then((valid) => {
                        if (!valid) {
                            return res
                                .status(401)
                                .json({ error: "Mot de passe incorrect" });
                        }

                        res.status(200).json({
                            userId: user.id,
                            lastName: user.lastName,
                            firstName: user.firstName,
                            isAdmin: user.isAdmin,
                            

                            token: jwt.sign(
                                { userId: user.id, isAdmin: user.isAdmin },
                                "RANDOM_TOKEN_SECRET",
                                { expiresIn: "24h" }
                            ),
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ error: "connexion échouée" });
                    });
            } else {
                return res
                    .status(404)
                    .json({ error: "veuillez créer un compte" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "connexion échouée" });
        });
};

//GET
// Se voir
exports.getUserProfile = (req, res, next) => {
    const id = req.params.id;
    db.user.findOne({
        attributes: [
            "id",
            "lastName",
            "firstName",
            "email",
            "avatar",
            "isAdmin",
            "createdAt",
            "updatedAt",
        ],
        where: { id: id },
    })
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "Utilisateur non trouvé" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({ error: "Utilisateur non trouvé" });
        });
};

//PUT
// Modifier son profil
exports.modifyUserProfile = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.body.user = userId;
    let postUser = {
        ...req.body,
    };

    let userObject = {
        ...req.body,
    };

    // Password
    if (userObject.password) {
        console.log("password change for user " + userId);
        userObject.password = await bcrypt.hash(userObject.password, 10);
    }

    //Avatar
    if (req.file) {
        console.log("avatar change for user " + userId);
        userObject.avatar = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`;
    }
    console.log(userObject);

    db.user.findOne({
        where: { id: userId },
    })
        .then((userFound) => {
            if (req.params.id == userId ) {
                db.user.update(userObject, {
                    where: { id: userId },
                })
                    .then(() =>
                        res.status(200).json({ message: "Profil mis à jour" })
                    )
                    .catch((error) => {
                        console.log(error);
                        res.status(400).json({
                            error: "Modification du profil échouée",
                        });
                    });
            } else {
                res.status(404).json({ error: "Utilisateur non trouvé" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Modification du profil échouée" });
        });
};

// DELETE
// Suppression de l'user
exports.deleteAccount = (req, res, next) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    db.user.findOne({
        attributes: ['id'],
        where: { id: id },
    })
        .then((user) => {
            if (id == userId || isAdmin) {
                db.user.destroy({
                    where: { id: id },
                })
                    .then(() =>
                        res.status(200).json({ message: "Compte supprimé" })
                    )
                    .catch(() =>
                        res
                            .status(500)
                            .json({ error: "Suppression du profil échouée" })
                    );
            } else {
                return res
                    .status(404)
                    .json({ error: "vous n'avez pas le droit de supprimer ce compte" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(id);
        });
};
