const {Sequelize} = require('sequelize');

//connection to the database
const sequelize = new Sequelize('todoapp','root','root',{
    host : 'localhost',
    dialect : 'mysql',
    Loging : false
});
//Testing database connection . . 
(async()=>{
    try{
    await sequelize.authenticate();
    console.log("database connection established");
    }catch(error){
        console.log("error . . "+error);
    }
})();

module.exports=sequelize;