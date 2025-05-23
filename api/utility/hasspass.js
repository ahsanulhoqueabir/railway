import bcrypt from "bcryptjs";

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10); // Generate a salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export default encryptPassword;
