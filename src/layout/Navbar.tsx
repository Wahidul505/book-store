/* eslint-disable @typescript-eslint/no-floating-promises */
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import { setUser } from "../redux/features/user/userSlice";
const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };

  return (
    <div className="navbar bg-rose-400 lg:px-12 fixed z-10">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Book Store
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control text-white mr-4">
          <Link to="/all-books">All Books</Link>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <CgProfile className="w-full h-full text-white" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {!user?.email && (
              <>
                <li>
                  <Link to="/sign-in">Sign In</Link>
                </li>
                <li>
                  <Link to="sign-up"> Sign Up</Link>
                </li>
              </>
            )}
            {user?.email && (
              <li>
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
