const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSearch=new Schema({
    userID:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    userSearch:[
        {
            bookname:{
                type: String,
                required: true,
                unique:false,
                trim: true
            },
            value:{
                type: Number,
                required: true,
                unique: false
            }
        }
    ]
});

const Search=mongoose.model('Search',userSearch);

module.exports = Search;