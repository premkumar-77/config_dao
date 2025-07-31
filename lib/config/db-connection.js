const { Sequelize } = require('sequelize')
async function serviceSequelize(sequelizeConfig) {
    if (!sequelizeConfig.user || !sequelizeConfig.host || !sequelizeConfig.database) {
        throw new Error('Missing required Sequelize config: user, host, or database');
    }
    const sequelize = new Sequelize({
        username: sequelizeConfig.user,
        password: sequelizeConfig.password,
        database: sequelizeConfig.database,
        host: sequelizeConfig.host,
        dialect: 'mysql',
        logging: sequelizeConfig.logging,
        pool: {
            max: sequelizeConfig.connectionLimit || 10
        }
    });

    await sequelize.authenticate()
        .then(() => {
            console.log(
                'Mysql Connection has been established successfully'
            )
        }).catch((err) => {
            console.log('Unable to Connect MysqlDatabase');
            throw new Error('mysql error: Connection Failure');
        }

    );
    return sequelize ;


}


module.exports = {
    serviceSequelize

};