'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
        onDelete: 'CASCADE',
      });
  
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments',
        onDelete: 'CASCADE',
      });
      
    }
  };
  User.init({
    firstName: {type: DataTypes.STRING,
      allowNull: false,},
    lastName:{type: DataTypes.STRING,
      allowNull: false,},
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    isAdmin:{ type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};