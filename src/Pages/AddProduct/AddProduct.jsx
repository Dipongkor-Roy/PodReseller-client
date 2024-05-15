import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";

const imageApiKey = import.meta.env.VITE_image_apikey;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;
const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const {user}=useAuth();
    const onSubmit = async (data) => {
        try {
          const formData = new FormData();
          formData.append("image", data.image[0]);
          
          const res = await fetch(imageHostingApi, {
            method: 'POST',
            body: formData,
          });
    
          if (res.ok) {
            const responseData = await res.json();
            if (responseData.data && responseData.data.display_url) {
              const productItem = {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                image: responseData.data.display_url
              };
    
              const serviceRes = await axiosSecure.post('/products', productItem);
              if (serviceRes.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${data.name} added Successfully`,
                  showConfirmButton: false,
                  timer: 1000
                });
              } else {
                throw new Error('Failed to add service');
              }
            } else {
              throw new Error('Failed to upload image');
            }
          } else {
            throw new Error(`Image upload failed: ${res.status} ${res.statusText}`);
          }
        } catch (error) {
          console.error('Error:', error);
          // Handle error (e.g., show error message to user)
        }
      };
    
    return (
        <div>
            <h3 className="my-2 text-center text-white font-semibold rounded-md bg-orange-400">Welcome Back {user?.name || 'Hero'}</h3>
              <h5 className="sm:text-3xl font-gabarito title-font  text-gray-500/70 text-center font-extrabold text-4xl md:text-5xl tracking-tight ">Add Products</h5>
              <div>
      <div className="flex items-center justify-center mb-5">
       
      </div>
      <div className="flex items-center justify-center ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-5">
            <div className="label">
              <span className="label-text">Product Name*</span>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Product Name"
              required
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex gap-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="flex gap-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Location*</span>
              </div>
              <input
                {...register("location", { required: true })}
                type="text"
                placeholder="Location"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="flex gap-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div>
            <label className="form-control">
              <div className="label mt-3">
                <span className="label-text">Description(Reason)</span>
              </div>
              <textarea
                {...register("description")}
                className="textarea textarea-bordered h-24"
                placeholder="Description"
              ></textarea>
            </label>
            <div className="mt-5">
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full"
              />
            </div>
          </div>
          <button type="submit" className="btn mt-3 rounded-md">
            Add item <FaPlusCircle />
          </button>
        </form>
      </div>
    </div>
        </div>
    );
};

export default AddProduct;