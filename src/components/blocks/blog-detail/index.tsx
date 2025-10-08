"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import Crumb from "./crumb";
import Markdown from "@/components/markdown";
import { Post } from "@/types/post";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type SidebarCategory = {
  uuid?: string;
  name?: string;
  title?: string;
};

export default function BlogDetail({
  post,
  categories,
  category,
}: {
  post: Post;
  categories?: SidebarCategory[];
  category?: SidebarCategory;
}) {
  const t = useTranslations();

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <Crumb post={post} />
        <h1 className="mb-7 mt-9 max-w-3xl text-2xl font-bold md:mb-10 md:text-4xl">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm md:text-base bg-background">
          <div>
            <span className="ml-2 text-muted-foreground">
              {post.created_at && moment(post.created_at).fromNow()}
            </span>
          </div>
        </div>
        <div className="relative py-8 max-w-full md:max-w-(--breakpoint-xl) gap-4 lg:mt-0 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          <Card className="order-1 w-full lg:order-none px-4">
            {post.content ? (
              <Markdown content={post.content} />
            ) : (
              <div className="text-muted-foreground text-sm py-4">
                {t("blog.no_content")}
              </div>
            )}
          </Card>
          <div className="order-2 flex h-fit flex-col gap-4 text-md lg:sticky lg:top-8 lg:order-none lg:text-md mt-4 lg:mt-0">
            {post.author_name && (
              <Card className="py-4 sm:py-6 rounded-lg sm:rounded-xl">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle>{t("blog.author")}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    {post.author_avatar_url && (
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border">
                        <AvatarImage
                          src={post.author_avatar_url}
                          alt={post.author_name}
                        />
                      </Avatar>
                    )}
                    {post.author_name && (
                      <span className="text-base">{post.author_name}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {category && (
              <Card className="py-4 sm:py-6 rounded-lg sm:rounded-xl">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle>{t("blog.category")}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="flex flex-col gap-2">
                    {category && (
                      <Link
                        href={`/posts?category=${encodeURIComponent(
                          category.name!
                        )}`}
                        className="text-primary"
                      >
                        {category.title || category.name}
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
