const User = require('../models/users').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const index = async (req, res) => {
  // send all the users here
  try {
    const users = await User.find().select('_id username name email');
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: 'Something went wrong...Please try again later'
    })
  }
};
const uploadImage = async(req,res) => {
  let {emailid,phoneno,password,username,image} = req.body;
  console.log(req.body);
  const url = req.protocol + "://" + req.get("host");
  try {
    let user = new User({
      _id : req.params.ID,
      name: username,
      email: emailid,
      password: password,
      phoneNo : phoneno,
      image  : url+'/'+req.file.path
    });
    console.log(user);
    await User.updateOne({_id:req.params.ID},user);
      res.status(200).json({
      id: user._id,
      name: user.name,
      phoneNo: user.phoneNo,
      email: user.email
    })
  }catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: 'Could not upload image...Please try again some time later'
    })
  }
};
const create = async (req, res) => {
  let { emailid,phoneno,password,username} = req.body;
  console.log(req.body);
  try {
    let user = new User({
      name: username,
      email: emailid,
      password: password,
      phoneNo : phoneno
    });
    console.log(user);
    let muser = await User.findOne({email:user.email});
      console.log(muser);
    if(muser)
    {
      res.status(500).json({
        error:true,
        message:"User with this email id already exists"
      })
    }
    await user.save();
    res.status(200).json({
      id: user._id,
      name: user.name,
      phoneNo: user.phoneNo,
      email: user.email
    })
  }catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: 'Could not create user...Please try again some time later'
    })
  }
};


const findUser = async (req, res) => {
  const userID = req.params.userID;
  try {
    const user = await User.findOne({ _id: req.params.userID }).select('phoneNo name email');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Could not find user'
    })
  }
};
//User updation
const updateUser= async (req,res,next) => {

  let {emailid,phoneno,password,username,gender,dob} = req.body;
  //const url = req.protocol + "://" + req.get("host");
  let user = new User({

    name: username,
    email: emailid,
    password: password,
    phoneNo : phoneno,
    gender: gender,
    dob: dob,
    // image: url+'/'+req.file.path,
  });
  const id= req.params.userID;


for (const key of Object.keys(req.body)) {
  console.log(key, req.body[key]);
  user[key]=req.body[key];

}
  await User.updateMany({_id: id},{$set:user},{multi:true})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(
        {
          message:'User Updated',
          REsult:result
        }
      );

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err});
    });

};
const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  let fetchedUser;
   User.findOne({ name: username}).then(user =>{
     if(!user) {
      return res.status(401).json({
        message:"Username incorrect"
      });
     }
     fetchedUser = user;
     return bcrypt.compare(password,fetchedUser.password);
   }).then(result => {
    if(!result){
       return res.status(401).json({
        message:"Password incorrect"
      });
    }
     const token = jwt.sign({
        name: fetchedUser.name,
        id: fetchedUser._id,
        phoneNo : fetchedUser.phoneNo,
        email: fetchedUser.email
      }, secret);
       console.log(token);
      res.status(200).json(fetchedUser);
  }).catch (error => {
    res.status(500).json({
      error: true,
      message: 'Something went wrong...Please try again later after some time'
    })
  });
};


const invites = async (req, res) => {
  const userID = req.params.userID;
  try {
    const events = await User.findOne({ _id: userID}).populate('invites').select('invites -_id');
    res.status(200).json(events.invites);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Something Went wrong...Please try again later after some time.'
    })
  }
};

module.exports = {
  index,
  create,
  findUser,
  authenticateUser,
  invites,
  uploadImage,
  updateUser
};
