import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';

// User model for the SQLite database.
// TODO: Potentially additional fields like avatar, firstName, lastName, etc.
class User extends Model {
    public id!: number;
    public email!: string;
    public password?: string;
    public githubId?: string;
    public facebookId?: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: new DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: new DataTypes.STRING(255),
        allowNull: true
    },
    githubId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    facebookId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
}, {
    tableName: 'users',
    sequelize
});

export default User;