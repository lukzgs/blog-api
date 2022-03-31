const { DataTypes } = require('sequelize');

const userAttributes = {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
   },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

const extra = {
  timestamps: false,
  tableName: 'Users',
};

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User', 
    userAttributes,
    extra,
  );
    
  User.associate = (models) => {
    User.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'user' });
  };
  
  return User;
};


// const { DataTypes } = require('sequelize');

// const postCategoryAttributes = {
//   postId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     // foreignKey: true,
//   },
//   categoryId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     // foreignKey: true,
//   },
// };

// const extra = { 
//   timestamps: false,
//   tableName: 'PostsCategories',
// };

// module.exports = (sequelize, _DataTypes) => {
//   const PostCategory = sequelize.define(
//     'PostCategory',
//     postCategoryAttributes,
//     extra,
//   );
  
//   PostCategory.associate = (models) => {
//     models.BlogPost.belongsToMany(models.Category, {
//       as: 'categories',
//       foreignKey: 'postId',
//       otherKey: 'categoryId',
//       through: PostCategory });

//     models.Category.belongsToMany(models.BlogPost, {
//       as: 'blogs',
//       foreignKey: 'categoryId',
//       otherKey: 'postId',
//       through: PostCategory });
//   };

//   return PostCategory;
// };
