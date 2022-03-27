const { DataTypes } = require('sequelize');

const postCategoryAttributes = {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    foreignKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    foreignKey: true,
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
    models.Category.belongsTo(models.Category, {
      as: 'Category',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategory });
    models.BlogPost.belongsTo(models.BlogPost, {
      as: 'BlogPosts', 
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategory });
  };

  return PostCategory;
};
