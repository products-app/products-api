const bcrypt = require('bcrypt');

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  return hash;
}

const checkPassword = async (password: string, userPassword: string) => {
  const isEqual = await bcrypt.compare(password, userPassword);
  return isEqual;
}

export {
  hashPassword,
  checkPassword,
}