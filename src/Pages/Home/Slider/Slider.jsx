

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../assets/banner1.webp";
import img2 from "../../../assets/banner2.webp";
import img3 from "../../../assets/banner3.webp";
const Slider = () => {
  
  return (
    <div className="lg:mx-[70px] mx-[30px] rounded-md text-base-content">
      <h1 className='sm:text-3xl font-gabarito title-font bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent text-center font-extrabold text-4xl md:text-5xl tracking-tight mb-12 md:my-10'>Want Best Deals?</h1>
    
    
     <Carousel className=" shadow-lg md:border md:p-2 md:rounded-2xl bg-orange-200/70 ">
      <div>
        <img src={img1} />
      </div>
      <div>
        <img src={img2} />
      </div>
      <div>
        <img src={img3} />
      </div>
      
      
    </Carousel>
     </div>
   
   
  );
};

export default Slider;