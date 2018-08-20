export default (sequelize, DataType) => {
  return sequelize.define("Transactions", {
    idTransacao: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cartao: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    valor: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    data: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });
};
