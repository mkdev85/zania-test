export interface AlbumData {
  type: string;
  title: string;
  position: number;
  thumbnail: string;
}

export interface GetAlbumBackendResponse {
  data: AlbumData[];
  lastSavedTime: string;
}

export const getAlbum = async () => {
  const response = await fetch("mockServiceWorker.js/api/album");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data as GetAlbumBackendResponse;
};
