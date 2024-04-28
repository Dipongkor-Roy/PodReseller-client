import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const LogIn = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { register, handleSubmit, reset } = useForm();
  const { logIn } = useContext(AuthContext);
  const { googleSignIn } = useContext(AuthContext);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const googleIn = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      const userInfo = {
        name: user.displayName,
        email: user.email,
        seller: false,
        buyer: true,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account Created Sucessfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      navigate("/");
    });
  };
  const onSubmitLogIn = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;
    logIn(email, password)
    .then((result) => {
      const user = result.user;
      console.log(user);
      Toast.fire({
        icon: "success",
        title: "Log in successfully",
      });
      navigate(from, { replace: true });
    });
    reset();
  };
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-gabarito font-bold text-orange-400">
            Login now!
          </h1>
          <p className="py-6">
            Step into Sound: Your Gateway to Premium AirPods - PodReseller
            Login!
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmitLogIn)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input  {...register("email", { required: true })}
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
              <input  {...register("password", { required: true })}
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-orange-400 text-white text-xl hover:bg-orange-500">
                Login
              </button>
            </div>
            <h2 className=" text-center font-gabarito">OR</h2>
            <button
              onClick={() => googleIn()}
              className="btn bg-base-200 hover:bg-base-300 text-xl text-black border-0"
            >
              <FcGoogle />
              Google
            </button>

            <h3 className="mt-2 text-sm text-gray-500">
              New to PodReseller?{" "}
              <Link to="/signUp">
                <span className="link link-accent">Create An Account</span>
              </Link>
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
