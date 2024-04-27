
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic=useAxiosPublic();
  const {signUp,updateUserProfile}=useContext(AuthContext)
  
  const navigate=useNavigate();

  const onSubmitSignUp = (data) => {
    console.log(data);
    reset();
    signUp(data.email,data.password)
    .then(result=>{
      const logedUser=result.user;
      console.log(logedUser)
      updateUserProfile(data.name,data.photoUrl)
      .then(()=>{
        const userInfo={
          name:data.name,
          email:data.email,
        };
        axiosPublic.post('/users',userInfo)
        .then((res)=>{
          if(res.data.insertedId){
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User Created Sucessfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }

        });
        navigate('/')
      })
    })
  };
  return (
    <div
    
      className="hero min-h-screen "
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold font-gabarito text-gray-500">Sign Up</h1>
          <p className="py-6">
            Unlock the World of AirPods: Join PodReseller Today!
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form   onSubmit={handleSubmit(onSubmitSignUp)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoUrl</span>
              </label>
              <input
                {...register("photoUrl", { required: true })}
                type="text"
                placeholder="PhotoUrl"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="Email"
                className="input input-bordered"
                required
              />
             <div className="mt-5 form-control bg-orange-200/70 rounded-md">
  <div className="flex items-center justify-evenly">
  <label className="cursor-pointer label">
    <span className="label-text">Seller</span>
    <input {...register('seller', {})}  type="checkbox" className="ml-2 checkbox checkbox-secondary" />
  </label>
  <label className="cursor-pointer label">
    <span className="label-text">Buyer</span>
    <input  type="checkbox"  className="ml-2 checkbox checkbox-secondary" />
  </label>
  </div>
</div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="text"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-orange-400 hover:bg-orange-500 text-xl text-white">SignUp</button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Already Have an Account?{" "}
              <Link to="/logIn">
                <p className="link mt-1">Go ➡️ Log In</p>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
