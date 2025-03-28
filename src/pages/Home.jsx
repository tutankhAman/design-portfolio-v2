function Home() {
  return (
    <div className="relative min-h-screen">
      {/* First section - clean white space */}
      <section className="bg-white h-screen flex flex-col justify-center items-center relative">
        {/* Your content will go here later */}
        
        {/* "aman" text at the bottom of first section only */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <h1 className="font-raleway font-medium text-[25vw] leading-none tracking-tighter text-gray-800">
            aman
          </h1>
        </div>
      </section>

      {/* Second section - introduction */}
      <section className="bg-gray-50 h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-7xl mb-8 text-gray-900 leading-tight">
            Hey I'm <span className="font-playfair font-bold italic">Aman</span> - I make <span className="font-playfair font-bold italic gradient-text">pixels</span> meet <span className="font-mono font-thin">code</span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed mx-auto">
            I <span className="font-lato italic">design with intent</span> and <span className="font-mono font-thin">code</span> with efficiency—crafting sleek, intuitive experiences that are as smooth to use as they are to look at. No guesswork, no mess—just <span className="font-lato italic">clean design, seamless functionality</span>, and a developer's touch to bring it all to life.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
