function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img 
            src="https://placehold.co/600x600" 
            alt="Profile" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Hi, I'm [Your Name]</h2>
          <p className="text-gray-700 mb-4">
            I'm a passionate designer with experience in creating intuitive and visually appealing digital 
            experiences. My journey in design began over [X] years ago, and I've been crafting meaningful 
            solutions for clients ever since.
          </p>
          <p className="text-gray-700 mb-4">
            My background spans across UI/UX design, graphic design, and brand identity. I believe that 
            great design not only looks good but solves real problems and improves people's lives.
          </p>
          <p className="text-gray-700">
            When I'm not designing, you can find me [your hobbies/interests], which helps me bring fresh 
            perspectives to my creative work.
          </p>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">My Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-100 p-4 rounded-lg text-center">UI Design</div>
          <div className="bg-slate-100 p-4 rounded-lg text-center">UX Research</div>
          <div className="bg-slate-100 p-4 rounded-lg text-center">Prototyping</div>
          <div className="bg-slate-100 p-4 rounded-lg text-center">Visual Design</div>
          <div className="bg-slate-100 p-4 rounded-lg text-center">Brand Identity</div>
          <div className="bg-slate-100 p-4 rounded-lg text-center">User Testing</div>
          <div className="bg-slate-100 p-4 rounded-lg text-center">Interaction Design</div>
          <div className="bg-slate-100 p-4 rounded-lg text-center">Design Systems</div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-6">Education & Experience</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-slate-800 pl-4 py-2">
            <h3 className="font-bold">Senior Designer at Company Name</h3>
            <p className="text-gray-600">2020 - Present</p>
            <p className="text-gray-700 mt-2">Leading design initiatives and collaborating with cross-functional teams.</p>
          </div>
          
          <div className="border-l-4 border-slate-800 pl-4 py-2">
            <h3 className="font-bold">Designer at Previous Company</h3>
            <p className="text-gray-600">2017 - 2020</p>
            <p className="text-gray-700 mt-2">Created user interfaces and improved product experiences.</p>
          </div>
          
          <div className="border-l-4 border-slate-800 pl-4 py-2">
            <h3 className="font-bold">Bachelor of Design</h3>
            <p className="text-gray-600">University Name, 2013 - 2017</p>
            <p className="text-gray-700 mt-2">Specialized in interaction design and visual communication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
