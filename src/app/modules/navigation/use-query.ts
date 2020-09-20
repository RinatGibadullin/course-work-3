import { useLocation } from "react-router-dom";
import queryString from "query-string";

export function useQuery() {
  return queryString.parse(useLocation().search);
  // return new URLSearchParams(useLocation().search);
}