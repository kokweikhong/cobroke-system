// import * as bcrypt from "bcrypt";

var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

export async function hashPassword(password: string) {
  // const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    console.log("executing verifyPassword");
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log("password is valid", isValid);
    return isValid;
  } catch (error) {
    console.error("Error verifying password:", error);
  }
}
