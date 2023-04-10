const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mangaSchema = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    year_written: {
        type: Number
    },
    NumberOfVolumes: {
        type: Number
    }
},
{
    collection: 'manga'
}
);

module.exports = mongoose.model('MangaSchema', mangaSchema)