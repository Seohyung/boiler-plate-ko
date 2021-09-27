const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        token: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: 'local',
        },
        snsID: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {}

  static findByToken(token) {
    try {
      let decoded = jwt.verify(token, 'secretToken');
      if (decoded) {
        const user = User.findOne({
          where: { [Op.and]: [{ email: decoded }, { token: token }] },
        });
        return user;
      }
    } catch (err) {
      return err;
    }
  }
};
