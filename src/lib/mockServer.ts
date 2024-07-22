import { workerHandlers } from "./workerHandlers";

export const initMockServer = async () => {
  if (typeof window !== "undefined") {
    const { setupWorker } = await import("msw/browser");
    const worker = setupWorker(...workerHandlers);

    await worker.start({
      quiet: true,
      onUnhandledRequest: 'bypass'
    });
  }
};
