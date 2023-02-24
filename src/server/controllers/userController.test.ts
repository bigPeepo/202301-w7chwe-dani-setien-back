import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../database/connectDatabase";
import { User } from "../../database/models/UserSchema";
import { app } from "..";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

const mockUser = {
  username: "elPirri",
  password: "amorDeJaco",
  email: "rubio_vallecano@gmail.com",
  image: "navajita.jpg",
};

const endpoint = "/user/signup";

describe("Given a POST users/signup endpoint", () => {
  describe("When it receives a request with name 'elPirri', password 'amorDeJaco', email 'rubio_vallecano@gmail.com' and image 'navajita.jpg'", () => {
    test("Then it should respond with status 201 and message 'Your user has been created' and username 'elPirri'", async () => {
      const expectedStatusCode = 201;
      const expectedResponseMessage = {
        username: mockUser.username,
      };

      const response = await request(app)
        .post(endpoint)
        .send(mockUser)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedResponseMessage);
    });
  });
});
