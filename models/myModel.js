//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");

//Creación del Schema Post
const adnSchema = new mongoose.Schema({
    adn: {
        type: String,
    },
    arn: {
        type: String,
    },
    proteina: {
        type: String,
    },
});

//Creación del modelo Post
const Post = mongoose.model("Post", adnSchema);

module.exports = Post;
