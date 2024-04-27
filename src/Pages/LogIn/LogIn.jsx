import { Link } from "react-router-dom";


const LogIn = () => {
    return (
        <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-gabarito font-bold text-orange-400">Login now!</h1>
            <p className="py-6">Step into Sound: Your Gateway to Premium AirPods - PodReseller Login!</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-orange-400 text-white text-xl hover:bg-orange-500">Login</button>
              </div>
              <h3 className="mt-2 text-sm text-gray-500">New to PodReseller? <Link to='/signUp'><span className="link link-accent">Create An Account</span></Link></h3>
            </form>
          </div>
        </div>
      </div>
    );
};

export default LogIn;