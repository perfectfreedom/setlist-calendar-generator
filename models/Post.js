const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    dummyproperty: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Post", postSchema);
