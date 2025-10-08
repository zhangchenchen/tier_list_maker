import Blog from "@/components/blocks/blog";
import { BlogItem, Blog as BlogType } from "@/types/blocks/blog";
import { getPostsByLocale, getPostsByLocaleAndCategory } from "@/models/post";
import {
  CategoryStatus,
  getCategories,
  findCategoryByName,
} from "@/models/category";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/posts`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/posts`;
  }

  return {
    title: t("blog.title"),
    description: t("blog.description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PostsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = await getTranslations();

  const categories = await getCategories({
    status: CategoryStatus.Online,
    page: 1,
    limit: 200,
  });

  let posts;
  if (category) {
    const matched = await findCategoryByName(category);
    posts = matched
      ? await getPostsByLocaleAndCategory(locale, matched.uuid!)
      : [];
  } else {
    posts = await getPostsByLocale(locale);
  }

  const blog: BlogType = {
    title: t("blog.title"),
    description: t("blog.description"),
    items: posts as unknown as BlogItem[],
    read_more_text: t("blog.read_more_text"),
  };

  return (
    <div className="container py-6 md:py-8">
      <Blog
        blog={blog}
        categories={categories as any}
        category={category as any}
      />
    </div>
  );
}
