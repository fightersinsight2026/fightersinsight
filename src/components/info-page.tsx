import type { ReactNode } from "react";

export function InfoPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-14">
          <div className="eyebrow mb-3">{eyebrow}</div>
          <h1 className="heading-display text-4xl sm:text-5xl text-white max-w-3xl leading-[1.05]">
            {title}
          </h1>
          {intro && <p className="mt-4 max-w-2xl text-lg text-ink-200">{intro}</p>}
        </div>
      </section>
      <section className="container-fi py-12">
        <div className="prose-fi mx-auto max-w-3xl">{children}</div>
      </section>
    </>
  );
}
