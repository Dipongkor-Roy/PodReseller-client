import useAllProducts from "../../Hooks/useAllProducts";
import Product from "../../components/Product/Product";
import Category from "../../Pages/Category/Category"

const AllProducts = () => {
    const products=useAllProducts();
    return (
       <div>
        <section className="text-gray-600 body-font mt-[65px] md:mx-1 mx-5">
        <h5 className="sm:text-3xl font-gabarito title-font  text-gray-500/70 text-center font-extrabold text-4xl md:text-5xl tracking-tight ">Check Products Via Category</h5>
<div className="my-5  border p-2 rounded-2xl bg-orange-100/70"><Category/></div>
        </section>
         <section className="text-gray-600 body-font mt-[65px] md:mx-1 mx-5">
        <h5 className="sm:text-3xl font-gabarito title-font  text-gray-500/70 text-center font-extrabold text-4xl md:text-5xl tracking-tight ">Product : {products[0].length}</h5>
    <div className="container px-5 py-10 mx-auto">
      <div className="flex flex-wrap -m-4">
        {products[0].map(product=><Product key={product.id} product={product}></Product>)}
       
      
      </div>
    </div>
    
  </section>
       </div>
    );
};

export default AllProducts;