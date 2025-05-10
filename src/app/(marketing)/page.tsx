export default function HomePage() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-16 md:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-neon-cyan">
          Grow Your X Presence, Effortlessly.
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-gray-300 md:text-xl">
          Upload your tweet CSV, get a detailed GPT-4o analysis, earn badges, and track your growth on our dashboard.
        </p>
      </div>
      <div className="card-glass rounded-xl p-8 md:p-12">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-100">Get Started in 3 Simple Steps</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-300">
          <li>Sign up for an account.</li>
          <li>Upload your tweets data (CSV).</li>
          <li>Receive your growth report and start improving!</li>
        </ol>
      </div>
      {/* Placeholder for more sections, e.g., Features, Testimonials */}
    </section>
  );
} 