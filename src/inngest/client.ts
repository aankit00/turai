import { Inngest } from "inngest";
import { sentryMiddleware } from "@inngest/middleware-sentry";

//create the client to send and receive events
export const inngest = new Inngest({
  id: "turai",
  middleware: [sentryMiddleware()],
});