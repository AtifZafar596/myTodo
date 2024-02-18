const express=require('express');
const router=express.Router();
const {createUser, userSignIn, uploadProfile}=require('../controllers/user');
const { validateUserSignup, userValidation, validateUserSignIn } = require('../middlewares/validation/user');
const { isAuth } = require('../middlewares/auth');
const User=require('../models/user');



router.post('/signup',validateUserSignup,userValidation,createUser);
router.post('/signin',validateUserSignIn,userValidation,userSignIn);
router.get('/profile',isAuth, (req,res)=>{
  console.log("request")
  if(!req.user) return res.json({success:false, message:"unauthorized sucess"})
      
  res.json({
    profile:{
      name:req.user.name
    }
  })
  console.log("done")
})
   
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


 module.exports=router