/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { loginUser } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: emailRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
    };
    await dispatch(loginUser({ email: user?.email, password: user?.password }));
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate("/");
    }
  }, [user?.email, isLoading]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignIn}
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
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
