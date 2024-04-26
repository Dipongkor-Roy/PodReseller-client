import heroimg from '../../../assets/Hero.png'
const Hero = () => {
  return (
    <section className="body-font inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] mb-3">
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="text-5xl font-gabarito font-bold mb-4 bg-[linear-gradient(90deg,var(--theme-colors-error)_0%,var(--theme-colors-secondary)_9%,var(--theme-colors-secondary)_42%,var(--theme-colors-primary)_47%,var(--theme-colors-accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&::selection]:bg-blue-700/20 [@supports(color:oklch(0%_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]">Best Airpods ReSell Platform
         
        </h1>
        <p className="mb-8 font-light leading-relaxed">Discover the ultimate AirPods resale hub! Buy or sell your AirPods hassle-free. Join us today!</p>
        <div className="flex justify-center">
          <button className="btn btn-md px-16 inline-flex text-white font-figtree font-normal bg-gradient-to-r from-orange-400 to-red-400 bg rounded-xl ">Explore</button>
         
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
        <img className="object-cover object-center border p-2 rounded-2xl bg-orange-200/70   shadow-sm" alt="hero" src={heroimg} />
      </div>
    </div>
  </section>
  );
};

export default Hero;
