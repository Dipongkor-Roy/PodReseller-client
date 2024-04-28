

const Blog = () => {
    return (
        <div className="my-[45px] grid justify-items-center gap-6">
        <div className="md:card max-w-sm  sm:max-w-none">
          <div className="bg-base-100 hover:bg-base-200 transition-colors shadow-xl rounded-xl flex flex-col sm:flex-row items-center">
            <figure className="mx-auto w-full object-cover p-6 sm:max-w-[16rem] sm:pe-0">
              <img loading="lazy" src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="border-base-content bg-base-300 rounded-btn border border-opacity-5" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p className="text-xs opacity-60">If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>
      </div>
      
      
    );
};

export default Blog;