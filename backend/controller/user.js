import User from "../model/User.js";
import { userSchema } from "../utils/joi.js";

export const getAllUser = async (_, res) => {
  console.log("LOG - Controller - getAllUser");
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ success: false, message: "No user found" });
    }
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.log("ERROR-LOG - Controller - getAllUser", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createUser = async (req, res) => {
  console.log("LOG - Controller - createUser");

  try {
    const { firstName, lastName, email } = req.body;
    const { error } = userSchema.validate({
      firstName,
      lastName,
      email,
    });
    if (error) {
      console.log("ERROR-LOG - Controller - createUser", error);
      return res.status(500).json({ success: false, message: error.message });
    }
    const newUser = new User({ firstName, lastName, email });
    const response = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User is created successfully",
      response,
    });
  } catch (err) {
    console.log("ERROR-LOG - Controller - createUser", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
