'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Story.hasMany(models.Chapter)
      Story.belongsTo(models.User)
      Story.belongsToMany(models.Tag, { through: 'StoryTag' })
    }
  }
  Story.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Story Title is required' },
        notNull: { msg: 'Story Title is required' },
        len: { args: [1, 30],
          msg: 'Story title must be between 1 and 30 characters'
        }
      }
    },
    description: DataTypes.STRING,
    storyImageUrl: DataTypes.STRING,
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    UserId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Story',
  });
  return Story;
};