import crypto from "crypto";

const generateID = () => {
  return crypto.randomBytes(8).toString("hex");
};
export { generateID };
