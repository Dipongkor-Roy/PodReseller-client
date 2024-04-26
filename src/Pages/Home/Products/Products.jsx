import useAllProducts from "../../../Hooks/useAllProducts";
import Product from "../../../components/Product/Product";


const Products = () => {
  const products=useAllProducts();
  
    return (
        <section className="text-gray-600 body-font mt-[65px] md:mx-1 mx-5">
            <h5 className="sm:text-3xl font-gabarito title-font  text-gray-500/70 text-center font-extrabold text-4xl md:text-5xl tracking-tight ">Products</h5>
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products[0].slice(0,4).map(product=><Product key={product.id} product={product}></Product>)}
           
          
          </div>
        </div>
      </section>
    );
};

export default Products;