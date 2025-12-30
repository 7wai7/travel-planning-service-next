import NextRequestUser from "./nextRequestUser";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RouteContext<P = any> = {
  params: Promise<P>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler<P = any> = (
  req: NextRequestUser,
  ctx: RouteContext<P>
) => Promise<Response>;
