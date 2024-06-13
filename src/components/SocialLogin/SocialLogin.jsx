// import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                (res.data);
                navigate('/');
            })
        })
    }

    return (
        <div className="px-5">
            <div className="divider"></div>
            <div>

                <button onClick={handleGoogleSignIn} className="btn w-full gap-10 flex text-xl">
             
                    <img src="/src/assets/google.png" alt=""className="w-8" />
                    Google
                   
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;