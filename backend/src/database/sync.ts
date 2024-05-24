import sequelize from './index';

// File responsible for setting up and synchronizing the database.
// Authenticates the connection to the database using `sequelize.authenticate()`.
const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ alter: true });
        console.log('Database synced.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

syncDatabase();