const Home = ({ onExplore }) => (
  <section className="flex flex-col items-center justify-center flex-1 py-24 px-4 text-center relative">
    <h1 className="text-5xl md:text-6xl font-extrabold text-primary-700 mb-6 drop-shadow-lg">PortfolioGen</h1>
    <p className="max-w-2xl text-lg md:text-2xl text-gray-700 mb-8 font-medium">
      Instantly create a stunning, personalized portfolio from your resume. Choose a template, upload your resume, and get a unique, shareable portfolio link in seconds.
    </p>
    <button
      onClick={onExplore}
      className="btn btn-primary text-lg px-8 py-3 shadow-lg hover:scale-105 transition-transform"
    >
      Explore
    </button>
    {/* Decorative shapes */}
    <div className="absolute top-0 left-0 w-40 h-40 bg-primary-100 rounded-full opacity-30 blur-2xl -z-10 animate-pulse" />
    <div className="absolute bottom-0 right-0 w-52 h-52 bg-primary-200 rounded-full opacity-20 blur-2xl -z-10 animate-pulse" />
  </section>
);

export default Home; 