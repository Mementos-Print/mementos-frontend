import { useMutation } from "@tanstack/react-query";
import { useAppState } from "./useAppState";
import API from "../utils/api";
import { useSetSelected } from "./useSetSelected";
import { useEffect } from "react";

const useRefreshToken = () => {
  const { accessToken } = useAppState();
  const setSelected = useSetSelected();

  const refreshToken = async () => {
    // console.log("Before", accessToken);
    const response = await API.post("tokens/refreshUser", {});
    return response.data.accessToken;
  };

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: refreshToken,
    onSuccess: (newToken) => {
      setSelected("accessToken", newToken);
      // setSelected("authLoading",false)
      // console.log("Refresh succes", newToken);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    // if (!accessToken) {
      // setSelected("authLoading",true)
    mutate();
    // }
  }, [accessToken]);

  return { refresh: mutate, isSuccess, isError,isPending };
};

export default useRefreshToken;
