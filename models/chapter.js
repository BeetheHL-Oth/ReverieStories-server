'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chapter.hasOne(models.AuthorNote)
      Chapter.belongsTo(models.Story)
    }
  }
  Chapter.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Chapter Title is required' },
        notNull: { msg: 'Chapter Title is required' },
        len: { args: [1, 30],
          msg: 'Chapter name must be between 1 and 30 characters'
        }
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Input is required' },
        notNull: { msg: 'Input is required' },
      }
    },
    chapterImageUrl: DataTypes.STRING,
    StoryId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Chapter',
  });
  return Chapter;
};