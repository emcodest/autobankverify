module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('batch_list', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

    
        user_id: {
            type: Sequelize.INTEGER
        },
    
        batch_name: {
            type: Sequelize.STRING
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