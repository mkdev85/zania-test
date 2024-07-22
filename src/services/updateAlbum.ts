import { AlbumData } from "./getAlbum";

export interface UpdateAlbumBackendResponse {
  isSuccess: boolean;
  message: string;
}

export const updateAlbum = async (items: AlbumData[]) => {
  const response = await fetch("mockServiceWorker.js/api/v1/albums", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(items),
  });

  if (!response?.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data as UpdateAlbumBackendResponse;
};
