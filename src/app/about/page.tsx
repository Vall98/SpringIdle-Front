import Link from "next/link";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>
          This is a small project made by Vall98 (
          <Link href="https://github.com/Vall98"
            target="_blank" rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-semibold">
            GitHub
          </Link>
          ).<br/>
          The website is developed with Next.js (React) and the API with FastAPI (Python).<br/>
          The project is deployed with GitHub Actions on Vercel and AWS.<br/>
        </p>
      </div>
    </main>
  );
}