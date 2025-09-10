import jwt from "jsonwebtoken"

const CreateT = (t)=>{
    return jwt.sign({t},process.env.JWT_SECRET)
}
export default CreateT