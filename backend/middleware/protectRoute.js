import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            res.status(400).json({ message: "Unauthorized:No Token Provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            res.status(400).json({ message: "Unauthorized:Invalid Token" })
        }

        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            res.status(400).json({ message: "User not found" })
        }

        req.user = user
        next()
    } catch (error) {

    }
}