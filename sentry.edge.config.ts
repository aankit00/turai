import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://9fb1c05f360802e5e7816a9c6a95448c@o4510703257190400.ingest.us.sentry.io/4510703261777920",

  // Define how likely traces are sampled. Adjust this value in production
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  sendDefaultPii: true,

  integrations: [
    Sentry.vercelAIIntegration(),
    Sentry.consoleLoggingIntegration({
      levels: ["log", "warn", "error"],
    }),
  ],
});
