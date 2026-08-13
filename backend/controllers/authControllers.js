import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js"


export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body
        if (!fullName || !username || !email || !password) {
            res.status(400).json({ message: "All fields are required" })
        }

        if (password.length !== 6) {
            res.status(400).json({ message: "password must be atleast 6 characters" })
        }

        const existingEmail = await User.findOne({ email })
        const existingUsername = await User.findOne({ username })

        if (existingEmail) {
            res.status(400).json({ message: "email already exists" })
        }

        if (existingUsername) {
            res.status(400).json({ message: "username already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullName: newUser.fullName,
                email: newUser.email,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
                bio: newUser.bio,
                link: newUser.link,
                followers: newUser.followers,
                following: newUser.following
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare(password, user.password,)

        if (!user || !isPasswordCorrect) {
            res.status(400).json({ message: "Invalid Credentials" })
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(201).json({
            _id: newUser._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
            bio: user.bio,
            link: user.link,
            followers: user.followers,
            following: user.following
        })

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logged out successfully" })
        res.cookie("jwt", "", { maxAge: 0 })
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMe = async (req, res) => {
    try {
        const user=await User.findById(req.user._id)
    } catch (error) {
        
    }
}