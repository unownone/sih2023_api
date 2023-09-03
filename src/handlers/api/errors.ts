import { IRequest, error } from "itty-router";

export async function NotFoundError(request: IRequest, ...args: any[]) {
  return error(404, {
    message: "Not Found",
  });
}

export async function UnauthorizedError(request: IRequest, ...args: any[]) {
  return error(401, {
    message: "Unauthorized",
  });
}
