const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
  
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Set the default value to the current timestamp when the document is created
  },
  tokens:[{type:Object}],
  
});

userSchema.pre('save',function(next){
  if(this.isModified('password' && 'confirmPassword')){
    bcrypt.hash(this.password && this.confirmPassword,8,(err,hash)=>{
      if(err) return next(err);
      this.password=hash;
      this.confirmPassword=hash;
      next();

    })
  }
})

userSchema.methods.comparePassword=async function(password){
  if(!password) throw new Error('Password is missing, cannot compare');
  try{
   const result= await bcrypt.compare(password,this.password);
   return result;
  } catch(error){
    console.log('Error while comparing password',error.message);
  }
}


userSchema.statics.isThisEmailInUse= async function (email){
  if(!email) throw new Error('Invalid Email');
  try{
      const user = await this.findOne({email})
      if(user) return false
      return true;

  }catch(error){
  console.log("Error inside this isThisEmailInUse method",error.message)
  return false;
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;