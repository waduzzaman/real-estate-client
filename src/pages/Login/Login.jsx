import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";
  // console.log("state in the location login page", location.state);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      // console.log(user);
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      {" "}
      <div className="min-h-screen flex justify-center items-center">
        <Helmet>
          <title> RealEstate | Login</title>
        </Helmet>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content  items-center justify-between w-full lg:w-2/3 mt-72 mb-10">
            <div className="text-center lg:text-center bg-emerald-800 text-white flex-1 p-8 lg:py-64 rounded-lg">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Please Login with your account and password or use Google Login
              </p>
            </div>
            <div className="card flex-shrink-0 w-full lg:w-1/2 max-w-lg shadow-2xl bg-black text-white flex-1 p-8 rounded-lg">
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered text-black"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      required
                    />
                    <span
                      // className="absolute top-3 right-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input
                    onBlur={handleValidateCaptcha}
                    type="text"
                    name="captcha"
                    placeholder="type the captcha above"
                    className="input input-bordered text-black"
                  />
                </div>
                <div className="form-control mt-6">
                  <input
                    disabled={false}
                    className="btn btn-primary"
                    type="submit"
                    value="Login"
                  />
                </div>
              </form>
              <p className="px-6 text-white">
                <small>
                  New Here?{" "}
                  <Link to="/signup" className="text-blue-500">
                    Create an account
                  </Link>
                </small>
              </p>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
