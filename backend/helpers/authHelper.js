import bcrypt from "bcrypt";

// Password convert to Hashed password
export const hashPassword = async(password) => {
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

// Comparison of Passwords
export const comparePassword = async (password, hashedPassword) =>{
    return bcrypt.compare(password, hashedPassword)
}