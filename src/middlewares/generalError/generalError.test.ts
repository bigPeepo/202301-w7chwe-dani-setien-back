import { type Response } from "express";
import { CustomError } from "../../customError/customError";
import { mockNext, mockRequest, mockResponse } from "../../mocks/mocks";
import { notFoundError } from "../notFoundError/notFoundError";
import { generalError } from "./generalError";

describe("Given a generalError function", () => {
  describe("When it receives an error with status code 500", () => {
    test("Then it should show an error with status code 500", () => {
      const statusCode = 500;
      const mockError = new CustomError("", statusCode, "Undetermined message");

      generalError(mockError, mockRequest, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
    });
  });

  describe("When it receives an error with the public message 'This is General Pete speaking'", () => {
    test("Then it should show the client an error with message 'This is General Pete speaking'", () => {
      const errorMessage = "This is General Pete speaking";
      const mockError = new CustomError("", 400, errorMessage);

      generalError(mockError, mockRequest, mockResponse as Response, mockNext);

      const expectedErrorWithMessage = { error: errorMessage };

      expect(mockResponse.json).toHaveBeenCalledWith(expectedErrorWithMessage);
    });
  });

  describe("When it receives an error with an invalid status code'", () => {
    test("Then it should show the client an error with status 500", () => {
      const invalidStatusCode = NaN;
      const mockError = new CustomError(
        "",
        invalidStatusCode,
        "Undetermined message"
      );
      const expectedStatusCode = 500;

      generalError(mockError, mockRequest, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives an error without a custom message defined", () => {
    test("Then it should show the client the default message 'Something went wrong'", () => {
      const errorMessage = "";
      const mockError = new CustomError("", 400, errorMessage);

      generalError(mockError, mockRequest, mockResponse as Response, mockNext);

      const expectedErrorWithMessage = { error: "Something went wrong" };

      expect(mockResponse.json).toHaveBeenCalledWith(expectedErrorWithMessage);
    });
  });
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call its next function with a status code of 404", async () => {
      notFoundError(mockRequest, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 404,
        })
      );
    });
  });
});
