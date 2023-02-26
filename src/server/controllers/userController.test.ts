import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../database/connectDatabase";
import { User } from "../../database/models/UserSchema";
import { app } from "../index";

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

  describe("When it receives a request with name 'elPirri', password 'amorDeJaco' and no email", () => {
    test("Then it should respond with status 500 and an error message 'Error creating the user'", async () => {
      const expectedStatusCode = 500;
      const expectedResponseMessage = {
        error: "Error creating the user",
      };

      const faultyMockUser = {
        username: mockUser.username,
        password: mockUser.password,
      };

      const response = await request(app)
        .post(endpoint)
        .send(faultyMockUser)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedResponseMessage);
    });
  });
});

describe("Given a POST users/login endpoint", () => {
  const endpoint = "/user/login";

  describe("When it receives a request with name 'elPirri' and password 'hijoDePicoleto'", () => {
    beforeAll(async () => {
      const saltLength = 10;
      const hashedPassword = await bcrypt.hash(mockUser.password, saltLength);

      const userCreationRequest = {
        username: mockUser.username,
        password: hashedPassword,
        email: mockUser.email,
        image: mockUser.image,
      };

      await User.create(userCreationRequest);
    });

    test("Then it should respond with status 401 and an error message", async () => {
      const expectedStatusCode = 401;
      const wrongPassword = "hijoDePicoleto";
      const expectedResponse = {
        error:
          "The combination loginname and password is incorrect, please try again.",
      };

      const userCredentials = {
        username: mockUser.username,
        password: wrongPassword,
      };

      const response = await request(app)
        .post(endpoint)
        .send(userCredentials)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedResponse);
    });
  });

  describe("When it receives a request with name 'elPirri' and password 'amorDeJaco'", () => {
    beforeAll(async () => {
      const saltLength = 10;
      const hashedPassword = await bcrypt.hash(mockUser.password, saltLength);

      const userCreationRequest = {
        username: mockUser.username,
        password: hashedPassword,
        email: mockUser.email,
        image: mockUser.email,
      };

      await User.create(userCreationRequest);
    });

    test("Then it should respond with status 200 and a token", async () => {
      const expectedStatusCode = 200;
      const expectedProperty = "token";

      const userCredentials = {
        username: mockUser.username,
        password: mockUser.password,
      };

      jwt.sign = jest.fn().mockReturnValue({
        token: "",
      });

      const response = await request(app)
        .post(endpoint)
        .send(userCredentials)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty(expectedProperty);
    });
  });

  describe("When it receives a request with name 'Jaro' and password 'vivoEnLaModelo'", () => {
    test("Then it should respond with status 401 and an error message", async () => {
      const expectedStatusCode = 401;
      const inexistentUserName = "Jaro";
      const password = "unimportant";
      const expectedResponse = {
        error:
          "The combination loginname and password is incorrect, please try again.",
      };

      const userCredentials = {
        username: inexistentUserName,
        password,
      };

      const response = await request(app)
        .post(endpoint)
        .send(userCredentials)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedResponse);
    });
  });
});
