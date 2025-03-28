function Approach() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Approach</h1>
      
      <p className="text-xl text-gray-700 mb-12 max-w-3xl">
        I believe that great design comes from a thoughtful process that puts users at the center.
        Here's how I approach design challenges to create meaningful solutions.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
          <h3 className="text-xl font-bold mb-3">Discovery</h3>
          <p className="text-gray-700">
            I start by understanding the problem space, researching users, and identifying opportunities.
            This phase involves stakeholder interviews, market research, and user research to build a solid foundation.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
          <h3 className="text-xl font-bold mb-3">Define</h3>
          <p className="text-gray-700">
            Next, I synthesize research findings to define clear goals and requirements.
            I create user personas, journey maps, and problem statements to guide the design process.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
          <h3 className="text-xl font-bold mb-3">Ideate</h3>
          <p className="text-gray-700">
            With a clear understanding of the problem, I generate multiple solutions through
            sketching, brainstorming, and collaborative workshops with stakeholders.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
          <h3 className="text-xl font-bold mb-3">Prototype</h3>
          <p className="text-gray-700">
            I bring ideas to life through low and high-fidelity prototypes, creating
            tangible designs that can be tested and evaluated before full implementation.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">5</div>
          <h3 className="text-xl font-bold mb-3">Test</h3>
          <p className="text-gray-700">
            I validate design solutions through user testing, gathering feedback to
            ensure the design effectively addresses user needs and business goals.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">6</div>
          <h3 className="text-xl font-bold mb-3">Implement & Iterate</h3>
          <p className="text-gray-700">
            Finally, I work closely with development teams to implement designs,
            and continue to refine based on user feedback and analytics.
          </p>
        </div>
      </div>
      
      <div className="bg-slate-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Design Principles</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li><span className="font-semibold">User-Centered:</span> I always prioritize the needs and goals of the end users.</li>
          <li><span className="font-semibold">Simplicity:</span> I believe in the power of simplicity and clarity in design.</li>
          <li><span className="font-semibold">Accessibility:</span> I design inclusive experiences that work for everyone.</li>
          <li><span className="font-semibold">Data-Informed:</span> I use data and research to guide design decisions.</li>
          <li><span className="font-semibold">Collaboration:</span> I value teamwork and cross-functional collaboration.</li>
        </ul>
      </div>
    </div>
  );
}

export default Approach;
