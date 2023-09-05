import { NeonDatabase } from "drizzle-orm/neon-serverless";
import { IRequest } from "itty-router";

export type Env = {
  TELEGRAM_BOT_TOKEN: string;
  DATABASE_URL: string;
  API_KEY: string;
};

export type DrizzleDB = NeonDatabase;

export interface IPaginationQuery {
  page: number;
  size: number;
  search?: string;
}

export interface IQuery {
  [key: string]: any;
}

export interface PaginatedRequest extends IRequest {
  query: IQuery & IPaginationQuery;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  count: number;
  total?: number;
  next?: string;
  prev?: string;
}
