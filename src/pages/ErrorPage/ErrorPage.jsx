import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Helmet>
        <title> RealEstate | Error</title>
      </Helmet>
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">404 - Page Not Found</h1>
        <p className="text-gray-700 mb-8">Oops! The page you are looking for seems to be broken.</p>
        {/* <img src="https://source.unsplash.com/featured/?error" alt="Broken Page" className="w-full h-auto mb-8 rounded-lg" /> */}
        <img src="/public/library-404.jpeg" alt="Broken Page" className="w-full h-auto mb-8 rounded-lg" />
        <Link to="/" className=" hover:underline bg-red-500 text-white p-3 rounded"> Go back to home page </Link>
      </div>
    </div>
  );
};

export default ErrorPage;