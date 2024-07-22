export interface AlbumData {
  type: string;
  title: string;
  position: number;
  thumbnail: string;
}

export interface GetAlbumBackendResponse {
  data: AlbumData[];
  lastSavedTime: number;
}

export const getAlbum = async () => {
  const response = await fetch("mockServiceWorker.js/api/v1/albums");

  if (!response?.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data as GetAlbumBackendResponse;
};
