import { NextResponse } from "next/server";
import { AppError } from "./utils/appError";

type Handler = (req: Request) => Promise<Response>;

export const withErrorHandler =
  (handler: Handler): Handler =>
  async (req) => {
    try {
      return await handler(req);
    } catch (e) {
      console.error(e);

      if (e instanceof AppError) {
        return NextResponse.json(
          { message: e.message },
          { status: e.status }
        );
      }

      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  };
