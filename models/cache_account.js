module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('cache_accounts', {

        id: { 
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },      
        
        user_id: {
            type: Sequelize.INTEGER
        },
        batch_id: {
            type: Sequelize.STRING(155)
        },
        account_number: {
            type: Sequelize.STRING(155)
        },
        bank_name: {
            type: Sequelize.STRING(155)
        },
        account_name: {
            type: Sequelize.STRING(155)
        },
        retries: {
            type: Sequelize.INTEGER
        },
         status: {
             type: Sequelize.STRING(155)
         }, 
         is_sent: {
             type: Sequelize.STRING(155)
         },
         sent_response: {
             type: Sequelize.TEXT("long")
         }


    },   
    
    {
        underscored: true,

        freezeTableName: true
    }
    
    );

    return TableName;

}