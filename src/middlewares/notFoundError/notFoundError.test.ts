import { type Response } from "express";
import { mockNext, mockRequest, mockResponse } from "../../mocks/mocks";
import { notFoundError } from "./notFoundError";

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
