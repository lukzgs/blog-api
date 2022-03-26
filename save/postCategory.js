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
      { foreignKey: 'id', as: 'categoryId', through: PostCategory });
    models.belongsTo(models.BlogPost, 
      { as: 'BlogPost',
       foreignKey: 'id',
       otherKey: 'id',
       through: PostCategory });
  };

  return PostCategory;
};