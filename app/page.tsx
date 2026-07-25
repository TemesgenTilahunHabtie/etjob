export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-6xl font-bold text-sky-400">
        ETJob
      </h1>

      <p className="mt-4 text-xl text-slate-300">
        Your career starts here.
      </p>

      <button className="mt-8 rounded-xl bg-sky-500 px-6 py-3 font-semibold hover:bg-sky-600 transition">
        Get Started
      </button>
    </main>
  );
}