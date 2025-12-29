import { Prisma } from "@prisma/client";
import { AppError } from "./appError";

type ErrorResponse = {
  message: string;
  status: number;
};

export function mapPrismaError(e: unknown): ErrorResponse {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    switch (e.code) {
      case "P2000":
      case "P2005":
      case "P2006":
      case "P2007":
        throw new AppError("Invalid input", 400);

      case "P2002":
        throw new AppError("Unique constraint failed", 400);

      case "P2003":
      case "P2014":
        throw new AppError("Relation constraint violation", 400);

      case "P2025":
        throw new AppError("Resource not found", 404);

      case "P2037":
        throw new AppError("Database overloaded", 400);

      default:
        throw new AppError("Internal server error", 500);
    }
  }

  if (e instanceof Prisma.PrismaClientValidationError)
    throw new AppError("Bad input", 400);

  throw new AppError("Internal server error", 500);
}

/**
 * === Prisma error codes ===
 *
 * P2000 — Value too long
 * P2001 — Record not found (where condition)
 * P2002 — Unique constraint failed
 * P2003 — Foreign key constraint failed
 * P2004 — Constraint failed
 * P2005 — Invalid value for field
 * P2006 — Invalid value
 * P2007 — Data validation error
 * P2014 — Relation violation
 * P2015 — Related record not found
 * P2016 — Query interpretation error
 * P2017 — Records for relation not connected
 * P2025 — Record not found
 * P2034 — Transaction failed
 * P2037 — Too many connections
 */
