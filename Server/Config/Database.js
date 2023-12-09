const mongoose = require("mongoose")
const connection = async () => {
    try {
        const connect = await mongoose.connect("mongodb://0.0.0.0:27017/demo");
        console.log("Database connected");
    }

    catch (e) {
        console.log("DB Error: " + e);
    }
}

module.exports = connection;