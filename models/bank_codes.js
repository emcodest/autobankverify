module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('bank_codes', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        bank_name: {
            type: Sequelize.STRING
        },
        bank_code: {
            type: Sequelize.STRING
        }
        

    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}