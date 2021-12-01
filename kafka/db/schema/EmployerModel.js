const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var employerSchema= new Schema({
  employerName:
    {
      firstName:{
        type:String,
        required:true,
      },
      lastName:{
        type:String,
        required:true,
      },
    },
  role:{
    type:String,
    required:true,
  },
  address:
    {
    streetAddress:{
      type:String,
      required:true,
    },
    city:{
      type:String,
      required:true,
    },
    state:{
      type:String,
      required:true,
    },
    zipCode:{
      type:String,
      required:true,
    }
  }
},
{
versionKey:false
});

const Employer = mongoose.model('Employer', employerSchema);
module.exports = Employer;
