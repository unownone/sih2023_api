import {
  createCors,
  error, // creates error responses
  Router, // the ~440 byte router itself
} from "itty-router";
import { addPaginationParams, isValidUser } from "../../util/middlewares";
import { getAllData, getData } from "./data";
import { NotFoundError } from "./errors";
export const { preflight, corsify } = createCors();

const router = Router({
  base: "/",
});

router
  // for cors
  .all("*", preflight)
  // @ts-ignore
  .get("/", addPaginationParams, getData) // Only get paginated Data
  .get("/all", isValidUser, getAllData) // get all data
  .all("*", NotFoundError); // Not Found Error

export default router;
