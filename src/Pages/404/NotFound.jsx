import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl mb-4 font-gabarito font-bold text-orange-400">404 - Page Not Found</h1>
        <p className="text-lg mb-4">Sorry, the page you are looking for does not exist.</p>
        <div className="w-64 h-auto bg-gray-200 mb-4">
        <img  src="https://cdn.svgator.com/images/2024/04/detective-animation-404-error-page.gif" alt="" /></div> 
       
       <Link to='/'> <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button></Link>
      </div>
  );
};

export default NotFound;