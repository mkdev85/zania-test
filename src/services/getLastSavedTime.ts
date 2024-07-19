export interface GetLastSavedTime {
  lastSavedTime: string;
  isSuccess: true;
}

export const getLastSavedTime = async () => {
  const response = await fetch("mockServiceWorker.js/api/last-saved");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data as GetLastSavedTime;
};
