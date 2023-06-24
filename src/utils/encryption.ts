import bcrypt from "bcrypt";
/**
 * This function generates a hashed password using bcrypt with a randomly generated salt.
 * @param {string} password - The `password` parameter is a string representing the plain text password
 * that needs to be hashed.
 * @returns The function `getHashedPassword` returns a Promise that resolves to the hashed password
 * string.
 */
export const getHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
