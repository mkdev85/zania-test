import { useState } from "react";

import { getAlbum, GetAlbumBackendResponse } from "@cat/services/getAlbum";
import { useSnackbar } from "notistack";
import { useOnMount } from "./useOnMount";

export const useGetAlbum = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GetAlbumBackendResponse>();

  const { enqueueSnackbar } = useSnackbar();

  useOnMount(() => {
    fetchAlbum();
  });

  const fetchAlbum = async () => {
    try {
      setIsLoading(true);
      const result = await getAlbum();
      setData(result);
      setIsLoading(false);
    } catch (error) {
      const errorMessage = (error as any)?.message ?? "Something went wrong!!";

      enqueueSnackbar({ message: errorMessage, variant: "error" });
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
  };
};
