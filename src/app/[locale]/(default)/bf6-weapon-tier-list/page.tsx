import { setRequestLocale } from "next-intl/server";
import { getBF6WeaponTierListPage } from "@/services/page";

export const revalidate = 60;
export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getBF6WeaponTierListPage(locale);
  
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/bf6-weapon-tier-list`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/bf6-weapon-tier-list`;
  }

  return {
    title: page.title || "BF6 Weapon Tier List - Complete Battlefield 6 Weapons Guide 2025",
    description: page.description || "Comprehensive BF6 weapon tier list with data-driven rankings, optimal loadouts, and expert strategies for Battlefield 2042. Discover S-tier weapons like VHX-D3, AC9, and more.",
    keywords: page.keywords || "bf6 weapon tier list, battlefield 6 weapon tier list, bf6 best weapons, battlefield 6 best guns, bf2042 weapons, battlefield 2042 tier list, bf6 meta weapons",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.title || "BF6 Weapon Tier List - Complete Guide",
      description: page.description,
      url: canonicalUrl,
      type: "article",
    },
  };
}

export default async function BF6WeaponTierListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await getBF6WeaponTierListPage(locale);

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Article Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {page.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          {page.description}
        </p>
        {page.lastUpdated && (
          <div className="text-sm text-muted-foreground">
            Last Updated: {page.lastUpdated}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none
        [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:text-primary
        [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-4
        [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mt-6 [&_h4]:mb-3
        [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
        [&_th]:bg-primary/10 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold
        [&_td]:border [&_td]:border-border [&_td]:p-3
        [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6
        [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
        [&_hr]:my-12 [&_hr]:border-t-2 [&_hr]:border-border
        [&_.warning-box]:bg-yellow-500/10 [&_.warning-box]:border-l-4 [&_.warning-box]:border-yellow-500 [&_.warning-box]:p-4 [&_.warning-box]:my-6
        [&_.important-note]:bg-blue-500/10 [&_.important-note]:border-l-4 [&_.important-note]:border-blue-500 [&_.important-note]:p-4 [&_.important-note]:my-6
        [&_.cta-box]:bg-primary/10 [&_.cta-box]:rounded-lg [&_.cta-box]:p-6 [&_.cta-box]:my-8 [&_.cta-box]:text-center
        [&_.tier-table]:my-8
      ">
        {page.content && (
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        )}
      </div>

      {/* CTA Section */}
      {page.cta && (
        <div className="mt-16 p-8 bg-primary/10 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">{page.cta.title}</h2>
          <p className="text-muted-foreground mb-6">{page.cta.description}</p>
          {page.cta.buttons && page.cta.buttons.map((button: any, index: number) => (
            <a
              key={index}
              href={button.url}
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              {button.title}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
