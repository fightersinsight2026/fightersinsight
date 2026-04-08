import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-fi grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <div className="heading-display text-6xl text-blood-500">TKO</div>
        <h1 className="mt-3 heading-display text-3xl text-white">Page not found.</h1>
        <p className="mt-2 text-ink-300">
          That page took a clean shot and didn&apos;t get back up. Let&apos;s get you home.
        </p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          Back to home
        </Link>
      </div>
    </div>
  );
}
