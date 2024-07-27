export const getAllUser = async (req, res) => {
  console.log("LOG - Controller - getAllUser");
  const userData = [
    { id: 1, name: "John" },
    { id: 2, name: "Cena" },
  ];
  res.status(200).json(userData);
};

export const createUser = async (req, res) => {
  console.log("LOG - Controller - createUser");
  res.status(200).json({ message: "User is created" });
};
