import { ALBUM_DATA_WSK, LAST_UPDATE_DATE_TIME } from "@cat/constants";
import { fakeDelay } from "@cat/helpers";
import type { AlbumData } from "@cat/services/getAlbum";
import localforage from "localforage";
import { http, HttpResponse } from "msw";

export const workerHandlers = [
  http.get("mockServiceWorker.js/api/album", async () => {
    try {
      // Fake delay 3 seconds
      await fakeDelay(3000);
      const albumData = (await localforage.getItem(
        ALBUM_DATA_WSK
      )) as AlbumData;

      const lastSavedTime = (await localforage.getItem(
        LAST_UPDATE_DATE_TIME
      )) as string;
      
      return HttpResponse.json({ data: albumData, lastSavedTime });
    } catch (error) {
      return HttpResponse.json(
        {
          isSuccess: false,
          message: (error as any)?.message,
        },
        {
          status: 500,
        }
      );
    }
  }),

  http.post("mockServiceWorker.js/api/album", async ({ request }) => {
    try {
      // Fake delay 3 seconds
      await fakeDelay(3000);
      const input = await request.json();
      await localforage.setItem(ALBUM_DATA_WSK, input);
      await localforage.setItem(LAST_UPDATE_DATE_TIME, Date.now());

      return HttpResponse.json({
        isSuccess: true,
        message: "Album order is updated!",
      });
    } catch (error) {
      return HttpResponse.json(
        {
          isSuccess: false,
          message: (error as any)?.message,
        },
        {
          status: 500,
        }
      );
    }
  }),
];
