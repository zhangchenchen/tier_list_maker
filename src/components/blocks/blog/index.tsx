import { ArrowRight } from "lucide-react";
import { Blog as BlogType } from "@/types/blocks/blog";
import { Link } from "@/i18n/navigation";
import { Category } from "@/types/category";
import { useTranslations } from "next-intl";

export default function Blog({
  blog,
  categories,
  category,
}: {
  blog: BlogType;
  categories: Category[];
  category: string;
}) {
  const t = useTranslations();

  if (blog.disabled) {
    return null;
  }

  return (
    <section className="w-full py-16">
      <div className="container flex flex-col items-center gap-8 lg:px-16">
        <div className="text-center">
          <p className="mb-6 text-xs font-medium uppercase tracking-wider">
            {blog.label}
          </p>
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {blog.title}
          </h2>
          <p className="mb-2 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            {blog.description}
          </p>
        </div>

        {categories && (
          <div className="mb-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/posts`}
              className={`px-4 py-1 rounded-md border ${
                !category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground"
              }`}
            >
              {t("blog.all")}
            </Link>
            {categories?.map((c) => (
              <Link
                key={c.uuid}
                href={`/posts?category=${encodeURIComponent(c.name)}`}
                className={`px-4 py-1 rounded-md border ${
                  category === c.name
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground"
                }`}
              >
                {c.title || c.name}
              </Link>
            ))}
          </div>
        )}

        {blog.items && blog.items.length > 0 ? (
          <div className="w-full flex flex-wrap items-start">
            {blog.items?.map((item, idx) => (
              <a
                key={idx}
                href={item.url || `/${item.locale}/posts/${item.slug}`}
                target={item.target || "_self"}
                className="w-full md:w-1/3 p-4"
              >
                <div className="flex flex-col overflow-clip rounded-xl border border-border">
                  {item.cover_url && (
                    <div>
                      <img
                        src={item.cover_url}
                        alt={item.title || ""}
                        className="aspect-16/9 h-full w-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="px-4 py-4 md:px-4 md:py-4 lg:px-4 lg:py-4">
                    <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                      {item.title}
                    </h3>
                    <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6">
                      {item.description}
                    </p>
                    {blog.read_more_text && (
                      <p className="flex items-center hover:underline">
                        {blog.read_more_text}
                        <ArrowRight className="ml-2 size-4" />
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-md py-8">
            {t("blog.no_content")}
          </div>
        )}
      </div>
    </section>
  );
}
