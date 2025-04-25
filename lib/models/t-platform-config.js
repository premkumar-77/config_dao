module.exports = (sequelize, DataTypes) => {

  return sequelize.define('t_platform_config', {
    productId: {
      field: 'f_product_id',
      type: DataTypes.STRING(100),
      primaryKey: true
    },
    key: {
      field: 'f_key',
      type: DataTypes.STRING(100)
    },
    value: {
      field: 'f_value',
      type: DataTypes.STRING(100)
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  
};