import {
  error, // creates error responses
  json, // creates JSON responses
  Router, // the ~440 byte router itself
  withParams,
} from "itty-router";
import { addPaginationParams } from "../../util/middlewares";
import { getData } from "./data";

const router = Router({
  base: "/",
});

router
  // 404 for everything else
  .get("/", addPaginationParams, getData)
  // .get("/all", isValidUser, getAllData)
  .all("*", () => error(404));

export default router;
