module.exports = (sequelize, Sequelize) => {    
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