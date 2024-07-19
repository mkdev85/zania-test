import localforage from "localforage";
import initialData from "../../public/data.json";
import { ALBUM_DATA_WSK, LAST_UPDATE_DATE_TIME } from "@cat/constants";
import { getCurrentDateTime } from "@cat/helpers";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "catAlbum",
});

export const initWebStorage = async () => {
  const data = await localforage.getItem(ALBUM_DATA_WSK);
  if (!data) {
    await localforage.setItem(ALBUM_DATA_WSK, initialData);
    await localforage.setItem(LAST_UPDATE_DATE_TIME, getCurrentDateTime());
  }
};
