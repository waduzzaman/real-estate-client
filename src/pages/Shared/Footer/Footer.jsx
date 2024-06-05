import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-20 pl-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <img src="/logo.jpeg" alt="Company Logo" className="w-24 h-24 mb-3" />
          <h1 className="text-2xl font-bold">Margel Rea lEstate</h1>
          <p className="mt-2 text-center md:text-left">
            We provide top-notch real estate management services, ensuring the best experience for our clients.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start pl-5">
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <a href="/about" className="mb-2 hover:underline">About Us</a>
          <a href="/services" className="mb-2 hover:underline">Services</a>
          <a href="/contact" className="mb-2 hover:underline">Contact</a>
          <a href="/faq" className="hover:underline">FAQ</a>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-white hover:text-gray-400"><FaFacebookF /></a>
            <a href="https://twitter.com" className="text-white hover:text-gray-400"><FaTwitter /></a>
            <a href="https://linkedin.com" className="text-white hover:text-gray-400"><FaLinkedinIn /></a>
            <a href="https://instagram.com" className="text-white hover:text-gray-400"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Margel RealEstate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

