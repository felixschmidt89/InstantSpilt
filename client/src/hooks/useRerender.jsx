import { useContext } from "react";
import { RerenderContext } from "../context/RerenderContext";

export const useRerender = () => {
  return useContext(RerenderContext);
};
