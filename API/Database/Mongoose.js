UserSchema = require("./Schema/User.js"),

module.exports.fetchGuild = async function(key){
    let client = await UserSchema.findOne({ name: key });

    if(client){
        return client;
    }else{
        client = new UserSchema({
            name: key,
            password: "false",
            email: "false",
            usertoken: "false",
            docker: [],
            registeredAt: Date.now()
        })
        await client.save().catch(err => console.log(err));
        return client;
    }
};