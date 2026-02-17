'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthorNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AuthorNote.belongsTo(models.Chapter)
    }
  }
  AuthorNote.init({
    note: DataTypes.TEXT,
    ChapterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AuthorNote',
  });
  return AuthorNote;
};