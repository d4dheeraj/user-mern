import { getAllUser } from "../controller/user";
import User from "../model/User";

jest.mock("../model/User");

const apiMockData = [
  {
    firstName: "username",
    lastName: "lastname",
    email: "username@lastname@domain.com",
  },
];

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
});
