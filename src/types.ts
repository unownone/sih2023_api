import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { IRequest } from "itty-router";

export type Env = {
  TELEGRAM_BOT_TOKEN: string;
  DATABASE_URL: string;
  API_KEY: string;
};

export type DrizzleDB = NeonHttpDatabase;

export interface IPaginationQuery {
  page: number;
  size: number;
  [key: string]: any;
}
export interface PaginatedRequest extends IRequest {
  query: IPaginationQuery;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  count: number;
  total?: number;
  next?: string;
  prev?: string;
}
