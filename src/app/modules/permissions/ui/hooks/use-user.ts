import { useSelector } from "react-redux";
import { currentUserSelector } from "app/modules/auth/store/current-user/selectors";

export function useUser() {
  return useSelector(currentUserSelector);
}