module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    // postId: { type: _DataTypes.INTEGER, foreignKey: true },
    // categoryId: { type: _DataTypes.INTEGER, foreignKey: true },
   },
  {
    timestamps: false,
    tableName: 'PostsCategories',
    underscored: true,
  });
  
  PostCategory.associate = (models) => {
    models.belongsTo(models.Category, 
      { as: 'Category', foreignKey: 'id', through: PostCategory });
    models.belongsTo(models.BlogPost, 
      { as: 'BlogPost', foreignKey: 'id', through: PostCategory });
  };

  return PostCategory;
};