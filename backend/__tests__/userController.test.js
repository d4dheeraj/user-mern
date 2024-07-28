import { getAllUser, createUser } from "../controller/user";
import User from "../model/User";
import Joi from "joi";

jest.mock("../model/User");

const apiMockData = [
  {
    firstName: "username",
    lastName: "lastname",
    email: "username.lastname@domain.com",
  },
];

const invalidApiMockData = {
  firstName: "username",
  lastName: "lastname",
  email: "username.lastname", //incorrect email
};

describe("User controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  //getAllUser
  describe("getAllUser", () => {
    test("should get all the users", async () => {
      User.find.mockResolvedValue(apiMockData);

      await getAllUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        users: apiMockData,
      });
    });

    test("should handle error if database is down", async () => {
      const errMsg = "Database is not connected";
      User.find.mockRejectedValue(new Error(errMsg));

      await getAllUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: errMsg,
      });
    });

    it("should return 404 when no users present in the db", async () => {
      User.find.mockResolvedValue(null);

      await getAllUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "No user found",
      });
    });
  });

  //create user
  describe("createUser", () => {
    beforeEach(() => {
      req.body = apiMockData[0];
    });

    test("should create a new user", async () => {
      const mockUser = { save: jest.fn().mockResolvedValue(req.body) };
      User.mockImplementation(() => mockUser);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User is created successfully",
        response: req.body,
      });
    });

    test("should handle error if database is down", async () => {
      const errMsg = "Database is not connected";
      const mockUser = {
        save: jest.fn().mockRejectedValue(new Error(errMsg)),
      };
      User.mockImplementation(() => mockUser);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: errMsg,
      });
    });

    test("should throw error with invalid email", async () => {
      req.body = invalidApiMockData;
      const { error } = Joi.object({
        email: Joi.string().email().required(),
      }).validate(req.body);
      const mockUser = { save: jest.fn().mockResolvedValue(req.body) };
      User.mockImplementation(() => mockUser);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: error.message,
      });
    });
  });
});
