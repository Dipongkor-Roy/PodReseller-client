/* eslint-disable react/prop-types */

import { useState } from "react";
import { FcApproval } from "react-icons/fc";
const ProductCategory = ({product}) => {
  const user=useState(true); //todo connect to auth
  const handleAddtoCart=(product)=>{
  console.log(product,user)
  }
    const {category,name,description,image,location,resale_price,years_of_use,seller_name,verified}=product;
    return (
        <div className="lg:w-1/2 md:w-1/2 p-4 w-full">
        <a className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={image}/>
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{category}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{name.slice(0,20)}</h2>
          <h3 className="text-gray-500 text-xs tracking-widest title-font my-1 flex items-center">Seller: {seller_name} - <span className="text-[20px]">{verified && <FcApproval />}</span></h3>
          <h3 className="text-gray-500 text-xs tracking-widest title-font my-1">Location: {location}</h3>
          <h3 className="text-gray-500 text-xs tracking-widest title-font my-1">Used: {years_of_use} year </h3>
          <h3 className="text-gray-500 text-xs tracking-widest title-font my-1">{description.slice(0,20)}</h3>
          <div className="flex items-center justify-between mt-3">
          <p className="text-md text-[22px] font-semibold ">${resale_price}</p>
          <button onClick={()=>handleAddtoCart(product)} className="btn btn-sm text-gray-500 bg-orange-200 hover:bg-orange-300 border-0">Book Now</button>
          </div>
        </div>
      </div>
    );
};

export default ProductCategory;