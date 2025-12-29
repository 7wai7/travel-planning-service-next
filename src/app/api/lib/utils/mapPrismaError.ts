import { Prisma } from "@prisma/client";

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
        return { message: "Invalid input", status: 400 };

      case "P2002":
        return { message: "Unique constraint failed", status: 400 };

      case "P2003":
      case "P2014":
        return { message: "Relation constraint violation", status: 400 };

      case "P2025":
        return { message: "Resource not found", status: 404 };

      case "P2037":
        return { message: "Database overloaded", status: 400 };

      default:
        return { message: "Internal server error", status: 500 };
    }
  }

  if (e instanceof Prisma.PrismaClientValidationError) {
    return { message: "Bad input", status: 400 };
  }

  return { message: "Internal server error", status: 500 };
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
