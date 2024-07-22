import localforage from "localforage";
import initialData from "../../public/data.json";
import { ALBUM_DATA_WSK, LAST_UPDATE_DATE_TIME } from "@cat/constants";

export const initWebStorage = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  localforage.config({
    driver: localforage.INDEXEDDB,
    name: "catAlbum",
  });

  localforage
    .ready()
    .then(async () => {
      const data = await localforage.getItem(ALBUM_DATA_WSK) as [] | null;
      if (!data || data?.length === 0) {
        await localforage.setItem(ALBUM_DATA_WSK, initialData);
        await localforage.setItem(LAST_UPDATE_DATE_TIME, Date.now());
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
