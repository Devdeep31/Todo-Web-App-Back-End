const {DataTypes} = require('sequelize');
const sequelize = require('../database');

//Creating table . . .
const Notes = sequelize.define('Notes',{
    note_title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    note_description : {
        type : DataTypes.STRING,
        allowNull : false
    }
});
 
sequelize.sync(); //create table if does't exist . . . .
module.exports = Notes;