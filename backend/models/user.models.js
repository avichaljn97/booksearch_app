const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    userFname:{
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    userLname:{
        type: String,
        required: false,
        unique: false,
        trim: true,
    },
    userEmailID:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
},
{
    timestamps:true,
});

const User=mongoose.model('User',userSchema);

module.exports =User;