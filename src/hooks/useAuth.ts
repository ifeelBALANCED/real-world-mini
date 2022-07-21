import { authStateSelector } from "@/store/selectors/auth.selectors";
import { useTypedSelector } from "@/store/store";

export const useAuth = () => useTypedSelector(authStateSelector);
