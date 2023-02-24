import { type NextFunction, type Request, type Response } from "express";

export const mockRequest = {} as Request;

export const mockNext: NextFunction = jest.fn();

export const mockResponse: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
