import Image from "next/image";
import ImageCarousel from "./components/ImageCarousel";
import routesData from "../data/routes.json";
import type { Route } from "../types/routes";

const routes: Route[] = routesData;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8A799] to-[#F7ECE0] text-slate-900">
      {/* Hero mit Logo */}
      <section className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-10">
        <Image
          src="/colibriLogo.png"
          alt="Colibri Trails Logo"
          className="h-[40vh] w-auto rounded-full object-cover"
          width={600}
          height={600}
        />
        <h1 className="-mt-8 font-serif text-4xl font-semibold text-[#FFFAF4]">
          Colibri Trails
        </h1>
        <p className="mt-2 max-w-md text-center text-md leading-relaxed text-[#FFFAF4]/90">
          Zwölf gemeinsame Wanderungen für 1 Jahr.
        </p>
      </section>

      {/* Timeline mit geschwungener Straße */}
      <section className="relative mx-auto max-w-4xl px-6 pb-20">
        {/* SVG-Straßen-Pfad (geschwungen, für Mobil optimiert) */}
        <svg
          className="absolute left-0 top-0 h-full w-full"
          viewBox="0 0 400 2400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 200 0 Q 100 200 200 400 T 200 800 Q 300 1000 200 1200 T 200 1600 Q 100 1800 200 2000 T 200 2400"
            stroke="#FFFAF4"
            strokeWidth="8"
            strokeDasharray="20 10"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </svg>

        {/* Routen-Liste */}
        <ul className="relative space-y-16 pt-8">
          {routes.map((route, idx) => {
            // Alternierend links/rechts positionieren
            const isLeft = idx % 2 === 0;
            return (
              <li
                key={route.id}
                className={`relative flex ${
                  isLeft
                    ? "justify-start pl-0 sm:pl-8"
                    : "justify-end pr-0 sm:pr-8"
                }`}
              >
                {/* Routen-Karte */}
                <article
                  className={`relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-[#FFFAF4]/40 bg-white shadow-lg shadow-orange-200/40 ${
                    isLeft ? "" : ""
                  }`}
                >
                  {/* Bild-Carousel */}
                  <ImageCarousel images={route.photos} alt={route.title} />

                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {route.title}
                      </h3>
                      <span className="rounded-full bg-[#E8A799] px-2.5 py-0.5 text-xs font-medium text-[#FFFAF4]">
                        {route.distance}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600">
                      {route.description}
                    </p>

                    {/* Meta-Infos */}
                    <dl className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div>
                        <dt className="font-medium">Höhenmeter</dt>
                        <dd>{route.elevation}</dd>
                      </div>
                      <div>
                        <dt className="font-medium">Dauer</dt>
                        <dd>{route.duration}</dd>
                      </div>
                    </dl>

                    {/* Komoot-Link */}
                    <a
                      href={route.komootLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#E8A799] px-4 py-2 text-xs font-medium text-white transition hover:bg-teal-700"
                    >
                      Auf Komoot ansehen
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  </div>
                </article>

                {/* Punkt auf der Straße */}
                <div
                  className={`absolute top-16 z-20 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#FFFAF4] bg-[#E8A799] shadow-md ${
                    isLeft ? "right-[calc(50%-1rem)]" : "left-[calc(50%-1rem)]"
                  }`}
                >
                  <span className="text-xs font-bold text-white">
                    {route.id}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
