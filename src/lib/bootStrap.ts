import { initWebStorage } from "./initWebStorage";
import { initMockServer } from "./mockServer";

export const bootStrap = async () => {
  await initWebStorage();
  await initMockServer();
};
