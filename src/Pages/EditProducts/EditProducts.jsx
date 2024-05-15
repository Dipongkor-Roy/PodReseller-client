
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";

const imageApiKey = import.meta.env.VITE_image_apikey;

const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;
const EditProducts = () => {
    const [product,setProduct]=useState(null)
    const {user}=useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
  
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);
 console.log(product)

const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(imageHostingApi, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const productItem = {
        name: data.name,
        description: data.description,
        resale_price: parseFloat(data.price),
        image: res.data.data.display_url,
      };
      const productRes = await axiosSecure.patch(
        `/products/${product._id}`,
        productItem
      );
      if (productRes.data.modifiedCount > 0) {
        //menu item added alert
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} added Successfully`,
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/dashboard/myProducts");
      }
    }
  };

 
 
    return (
        <div>
             <h3 className="my-2 text-center text-white font-semibold rounded-md bg-orange-400">Welcome Back {user?.name || 'Hero'}</h3>
              <h5 className="sm:text-3xl font-gabarito title-font  text-gray-500/70 text-center font-extrabold text-4xl md:text-5xl tracking-tight ">Edit Product</h5>
             <div className="flex items-center justify-center ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-5">
            <div className="label">
              <span className="label-text">Product Name*</span>
            </div>
            <input
              defaultValue={product?.name}
              {...register("name", { required: true })}
              type="text"
              placeholder="Product Name"
              required
              className="input input-bordered w-full "
            />
          </label>
          <div className="flex gap-6">
            {/* category */}

            {/* price */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                defaultValue={product?.resale_price}
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full "
              />
            </label>
          </div>
          <div>
            <label className="form-control">
              <div className="label mt-3">
                <span className="label-text">Description</span>
              </div>
              <textarea
                defaultValue={product?.description}
                {...register("description")}
                className="textarea textarea-bordered h-24"
                placeholder="Description"
              ></textarea>
            </label>
            {/* file upload */}
            <div className="mt-5">
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full"
              />
            </div>
          </div>
          <button type="submit" className="btn mt-3 rounded-md">
            Update Product <FaPlusCircle />
          </button>
        </form>
      </div>
      </div>
       
    );
};

export default EditProducts;