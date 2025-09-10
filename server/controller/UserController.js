import userModel from "../model/User.js";
import bcrypt from 'bcrypt'
import CreateT from "../middlewares/CreateToken.js";
export const register = async (req,res) =>{
    try {
        const {name,email,password} = req.body
     if(!name || !email || !password){return res.json({mess:"Enter all details"})}
    const FoundUser = await userModel.findOne({email})
    if(FoundUser){return res.json({mess:"User Already Exist"})}
    const vpass = await bcrypt.hash(password,10)

    const newUser = await userModel.create({
        name,email,password:vpass
    })
     const token = CreateT(newUser._id)
    res.json({status:"t",mess:"New User Created",newUser,token})
    } catch (error) {
        console.log(error)
    }
    
}

export const login = async (req,res) =>{
    try {
        const {email,password} = req.body
     if( !email || !password){return res.json({mess:"Enter all details"})}
    const FoundUser = await userModel.findOne({email})
    if(!FoundUser){return res.json({mess:"User Not Exist"})}
    const vpass = bcrypt.compare(password,FoundUser.password)
    if(!vpass){return res.json({mess:"wrong pass"})}
    const token = CreateT(FoundUser._id)
    res.json({status:"t",mes:"Logged Success",FoundUser,token})
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({ _id: { $ne: req.params.id } }).select("-password");
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

export const getBySetect = async (req,res)=>{
  try {
    const userId = req.params.userId;
    const {email} = req.body
    const foundEmail = await userModel.findOne({email})
    if(!email){return res.json({mes:"user not found"})}

    const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $push: { friends: email } },
            { new: true }
        );
    const mainUSer = await userModel.findOne({email}).select("-password")

    res.json({mes:"Added",updatedUser,mainUSer})



  } catch (error) {
    console.log(error)
  }
}


export const getFrds = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendEmails = user.friends;
    
    const friends = await userModel.find({ 
      email: { $in: friendEmails } 
    }).select('name email _id'); 

    res.json(friends);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};