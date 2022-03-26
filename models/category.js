const { DataTypes } = require('sequelize');

const cagotegoryAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const extra = {
  timestamps: false,
  tableName: 'Categories',
};

module.exports = (sequelize) => {
  const Category = sequelize.define(
    'Category',
    cagotegoryAttributes,
    extra,
  );
  return Category;
};
