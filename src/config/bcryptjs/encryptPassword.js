import bcryptjs from 'bcryptjs';

const encrypted = {}

encrypted.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
}

encrypted.matchPassword = async (password, savedPassword) => {
    try {
        return await bcryptjs.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
}


export default encrypted;