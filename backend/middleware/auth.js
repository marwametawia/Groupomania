const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    }  else if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
      console.log(isAdmin)
      return res.status(401).json({error: "User role non valable !"})}
    else {
      next();
    }
  } catch(error) {
    console.log(error)
    res.status(401).json({
      error: new Error('requête non authorisée!')
    });
  }
};