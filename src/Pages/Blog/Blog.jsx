

const Blog = () => {
  const blogIteams=[
    {
      "question_number": "13.1",
      "question": "What are the different ways to manage a state in a React application?",
      "answer": "In React, state management options include: 1. useState Hook 2. useReducer Hook 3. Context API 4. Redux",
      "image": "https://www.loginradius.com/blog/static/ef27359624480604211f0e018dd47f18/d9e4b/title-image.png"
    },
    {
      "question_number": "13.2",
      "question": "How does prototypical inheritance work?",
      "answer": "Prototypical inheritance in JavaScript involves objects inheriting properties/methods from their prototype.",
      "image": "https://dmitripavlutin.com/static/1e3ebf031af62ebf4786e65941e996e1/be4c9/cover-2.webp"
    },
    {
      "question_number": "13.3",
      "question": "What is a unit test? Why should we write unit tests?",
      "answer": "A unit test verifies small units of code in isolation, aiding bug detection and facilitating code documentation and refactoring.",
      "image": "https://lh3.googleusercontent.com/o0mH_y1WNDrJrV21l4C-VS56LLfuk2b7a7BU0J-Ag7CVegYFNyDE9Ac2zfayqNcyjY0L9FrLyrzY56ehVkaQV3s-dQwNhs7c2rXwoyZNHrmj1C94egADaJ58FPBd2vK7qi88zl9ovnGv92oVCgkY_-gPrXs5tVivDY3zquHP_NsQSo6CUkZLoez_Yqi8Ww"
    },
    {
      "question_number": "13.4",
      "question": "React vs. Angular vs. Vue?",
      "answer": "React: Library for UI components. Angular: Comprehensive framework. Vue: Progressive framework.",
      "image": "https://almablog-media.s3.ap-south-1.amazonaws.com/Blog_banners_thumbnail_Reactjs_Angular_js_vue_js_587fb7fd91_6396fb8771.png"
    }
  ];

    return (
        <div className="my-[45px] grid justify-items-center gap-6">
          <h3 className="sm:text-3xl font-gabarito title-font  text-gray-500/70 text-center font-extrabold text-4xl md:text-5xl tracking-tight ">Daily <span className="text-orange-400">Blog</span></h3>
          
        <div className="md:card max-w-sm  sm:max-w-none">
        <div className="divider divider-accent mx-5 mb-3 mt-0"></div>
          {
            blogIteams.map(blog=>( <div key={blog.question_number} className="bg-base-100 hover:bg-base-200 transition-colors shadow-xl rounded-xl flex flex-col sm:flex-row items-center mx-5 my-2">
            <figure className="mx-auto w-full object-cover p-6 sm:max-w-[16rem] sm:pe-0">
              <img loading="lazy" src={blog.image} alt="Shoes" className="border-base-content bg-base-300 rounded-btn border border-opacity-5" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{blog.question}</h2>
              <p className="text-xs opacity-60">{blog.answer}</p>
            </div>
          </div>))
          }
         
        </div>
      </div>
      
      
    );
};

export default Blog;