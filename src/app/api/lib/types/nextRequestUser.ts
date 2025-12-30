import { TokenUserData } from "@/app/lib/shared/types/tokenUserData.dto";
import { TripRole } from "@prisma/client";
import { NextRequest } from "next/server";

export default interface NextRequestUser extends NextRequest {
  user?: TokenUserData,
  tripRole?: TripRole
}