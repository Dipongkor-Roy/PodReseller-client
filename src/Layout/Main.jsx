import Hero from "../Pages/Home/Hero/Hero";
import Products from "../Pages/Home/Products/Products";
import Slider from "../Pages/Home/Slider/Slider";
import Stats from "../Pages/Home/Stats/Stats";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../shared/Footer";



const Main = () => {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Slider/>
            <Products/>
            <Stats/>
            <Footer/>
        </div>
    );
};

export default Main;