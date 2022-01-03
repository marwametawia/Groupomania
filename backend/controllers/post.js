const fs = require("fs");
const post = require("../models").Post;
const user = require("../models").User;
const comment = require("../models").Comment;

/*Creation post*/

exports.createPost = (req, res, next) => {
    
    const postObject = JSON.parse(req.body.post);
    console.log(req.body);
    console.log(postObject);
    delete post.Object.id;
    const post = Post.build({// attache l'ID utilisateur 
        ...postObject /*... opérateur spread permet copie tous les élèments de req.body*/,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
    });
    console.log(post);
    post.save()
        .then(() => res.status(201).json({ message: "post crée!" }))
        .catch((error) => res.status(400).json({ error }));
};

/* retourne le post correspondant à l'Id fourni*/

exports.getOnePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await post.findOne({
            where: { id: postId },
            include: [
                {
                    model: comment,
                    as: "comments",
                    include: [
                        {
                            model: user,
                            as: "author",
                        },
                    ],
                },
                {
                    model: user,
                    as: "author",
                },
            ],
        });
        if (post) {
            return res.status(200).json({ post });
        }
        return res
            .status(404)
            .send("post non trouvé");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

/* modification du post correspondant à l'Id fourni*/

exports.modifyPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const [updated] = await post.update(req.body, {
            where: { id: postId },
        });
        if (updated) {
            const updatedPost = await post.findOne({ where: { id: postId } });
            return res.status(200).json({ post: updatedPost });
        }
        throw new Error("Post non trouvé");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

/*Supprime le post correspondant à l'Id fourni*/
exports.deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const deleted = await post.destroy({
        where: { id: postId }
      });
      if (deleted) {
        return res.status(204).send("Post supprimé");
      }
      throw new Error("Post non trouvé");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await post.findAll({
            include: [
                {
                    model: comment,
                    as: "comments",
                },
                {
                    model: user,
                    as: "author",
                },
            ],
        });
        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
