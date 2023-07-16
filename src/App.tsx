import { useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import { useAppDispatch } from "./redux/hook";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase.init";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <>
      <MainLayout />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
