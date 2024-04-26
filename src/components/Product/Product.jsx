/* eslint-disable react/prop-types */


const Product = ({product}) => {
   console.log(product)

    const {category,name,description,image,location,resale_price,years_of_use,seller_name}=product;
    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={image}/>
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>
                <h3 className="text-gray-500 text-xs tracking-widest title-font my-1">Location: {location}</h3>
                <h3 className="text-gray-500 text-xs tracking-widest title-font my-1">Used: {years_of_use} year </h3>
                <h3 className="text-gray-500 text-xs tracking-widest title-font my-1">{description.slice(0,20)}</h3>
                <div className="flex items-center justify-between">
                <p className="mt-2 text-md font-semibold ">${resale_price}</p>
                <button className="btn btn-sm text-gray-500 bg-orange-200 hover:bg-orange-300 border-0">Book Now</button>
                </div>
              </div>
            </div>
    );
};

export default Product;