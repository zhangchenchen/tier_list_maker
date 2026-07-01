import Footer from "@/components/blocks/footer";
import Header from "@/components/blocks/header";
import { ReactNode } from "react";
import { getLandingPage } from "@/services/page";
import Feedback from "@/components/feedback";

export default async function DefaultLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getLandingPage(locale);

  return (
    <>
      {page.header && <Header header={page.header} />}
      <div className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white py-3 px-4 text-center z-40 shadow-lg border-b border-purple-500/30">
        {/* Background decorative music elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-around items-center text-xl sm:text-2xl">
          <span className="animate-pulse">🎵</span>
          <span className="animate-bounce delay-75">🎸</span>
          <span className="animate-pulse delay-150">🎹</span>
          <span className="animate-bounce delay-300">🎧</span>
          <span className="animate-pulse delay-200">🎶</span>
        </div>
        
        <a href="https://music0.org/" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-2 hover:scale-105 transition-transform font-bold text-sm sm:text-base drop-shadow-md">
          <span className="text-xl animate-spin-slow">🎵</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-violet-300">
            AI Music Generator Free & No Signup
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>
      <main className="overflow-x-hidden">{children}</main>
      {page.footer && <Footer footer={page.footer} />}
      {/* <Feedback socialLinks={page.footer?.social?.items} /> */}
    </>
  );
}
