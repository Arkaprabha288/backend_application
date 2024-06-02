import validator from "validator";
import { User} from "../models/user.model.js"

async function userRegisterValidation (userData){
    const { fullName,username, email, password } = userData;
    let validations=[]
    const isAlphaSpace = (str)=> {
        return /^[a-zA-Z\s]*$/.test(str) && fullName.length <= 255;
    }

    const userNameValidation =(username)=>{
        return validator.isAlphanumeric(username) && validator.isLowercase(username) &&  validator.isLength(username, { max: 255 }) 
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        validations = [{
            isValid: false , message: "User with email or username already exists"
        }]
    }else{
        validations = [
            { isValid: isAlphaSpace(fullName) , message: 'Name should only contain alphabets' },
            { isValid: validator.isEmail(email), message: 'Invalid email format' },
            { isValid:  userNameValidation(username), message: 'Invalid username format'},
            { isValid: validator.isStrongPassword(password), message: 'Password is not strong enough' },
        ];
    }
    
    return validations;
}

export {
    userRegisterValidation
}