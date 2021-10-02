module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('batch_workers', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

    
        batch_id: {
            type: Sequelize.INTEGER
        },

         status: {
             type: Sequelize.ENUM('active', 'inactive'),
             defaultValue: 'active'
         }


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}