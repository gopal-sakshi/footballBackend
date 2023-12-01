const dbConfig = require("../../config/postgres-sequelize.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial23.model.js")(sequelize, Sequelize);
module.exports = db;



db.tutorials = (sequelize, Sequelize) => {    
    // These columns will be generated automatically: id, title, description, published, createdAt, updatedAt.
const Tutorial23 = sequelize.define("tutorial44", {
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    published: { type: Sequelize.BOOLEAN }
}, {        
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'tutorial45'        
  });
return Tutorial23;
};