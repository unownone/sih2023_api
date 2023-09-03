import { IRequest } from "itty-router";
import { PAGE_SIZE } from "./constants";
import { PaginatedRequest } from "../types";

export async function addPaginationParams(request: PaginatedRequest) {
  const { page, size } = request.query;
  request.query = {
    page: page ? Number(page) - 1 : 0,
    size: size ? Number(size) : PAGE_SIZE,
  };
}
