import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password) => {
    if (!password) {
        throw new Error("Password is required for hashing");
    }
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
};


export const comparePassword = (plain, hashed) =>{
    return bcrypt.compareSync(plain, hashed);

};

export default {hashPassword, comparePassword};
