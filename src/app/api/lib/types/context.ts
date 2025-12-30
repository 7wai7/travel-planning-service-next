import NextRequestUser from "./nextRequestUser";

export type RouteContext<P = object> = {
  params: Promise<P>;
};

export type Handler<P = object> = (
  req: NextRequestUser,
  ctx: RouteContext<P>
) => Promise<Response>;
