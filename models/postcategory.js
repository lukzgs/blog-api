const { DataTypes } = require('sequelize');

const postCategoryAttributes = {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    // foreignKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    // foreignKey: true,
  },
};

const extra = { 
  timestamps: false,
  tableName: 'PostsCategories',
};

module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    postCategoryAttributes,
    extra,
  );
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategory });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogs',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategory });
  };

  return PostCategory;
};