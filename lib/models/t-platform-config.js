module.exports = (sequelize, DataTypes) => {

  return sequelize.define('T_PLATFORM_CONFIG', {
    productId: {
      field: 'f_product_id',
      type: DataTypes.STRING(100),
      primaryKey: true
    },
    key: {
      field: 'f_key',
      type: DataTypes.STRING(100),
      primaryKey:true
    },
    value: {
      field: 'f_value',
      type: DataTypes.STRING(100)
    },
    time :{
      field: 'f_time',
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  
};