import jwt from "jsonwebtoken"

const genToken=  async(user) => {
    try {
        let token = await jwt.sign({userId: user._id, role: user.role},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log("token error")
    }
    
}
export default genToken