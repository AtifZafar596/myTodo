const mongoose = require('mongoose');

const url = "mongodb+srv://atifzafar596:atifzafar123@cluster0.nlpsjea.mongodb.net/";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 // Use IPv4, skip trying IPv6
};

const connectWithDB = async () => {
    try {
        await mongoose.connect(url, options);
        console.log("Database connection succeeded");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

connectWithDB();
