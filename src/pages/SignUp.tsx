/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { createUser } from "../redux/features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: emailRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
    };
    await dispatch(
      createUser({ email: user?.email, password: user?.password })
    );
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate("/");
    }
  }, [user?.email, isLoading, navigate]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              ref={emailRef}
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Create account
            </button>
          </div>
          <div className="text-end mt-3 underline text-gray-600">
            <Link to="/sign-in">Want to Sign in?</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
