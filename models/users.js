module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('users', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.TEXT,
            notEmpty: true
        },
        
        password: { 
            type: Sequelize.TEXT,
            notEmpty: true
        },
 
        fname: {
            type: Sequelize.STRING
        },

         status: {
             type: Sequelize.ENUM('active', 'inactive'),
             defaultValue: 'active'
         },
         api_key: {
            type: Sequelize.STRING(255)
        },
         is_2fa: {
            type: Sequelize.STRING(10)
        },
         secret: {
            type: Sequelize.STRING(255)
        },
         qr_code: {
            type: Sequelize.TEXT("long")
        }


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}