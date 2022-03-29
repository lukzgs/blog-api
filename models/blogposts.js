const { DataTypes } = require('sequelize');

const blogPostsAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
    // field: 'user_id',
  },
  published: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'published',
    defaultValue: DataTypes.NOW,
  },
  updated: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated',
  },
};

const extra = {
  timestamps: false,
  tableName: 'BlogPosts',
};

module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', blogPostsAttributes, extra);
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { 
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return BlogPost;
};