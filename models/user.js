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

  return User;
};