"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github, Mail, MessageCircle, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAppContext } from "@/contexts/app";
import { useState } from "react";
import { SocialItem } from "@/types/blocks/base";
import { useTranslations } from "next-intl";

export default function Feedback({
  socialLinks,
}: {
  socialLinks?: SocialItem[];
}) {
  const t = useTranslations();

  const { user, setShowSignModal, showFeedback, setShowFeedback } =
    useAppContext();

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(10);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!user) {
      setShowSignModal(true);
      return;
    }

    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    try {
      setLoading(true);

      const req = {
        content: feedback,
        rating: rating,
      };

      const resp = await fetch("/api/add-feedback", {
        method: "POST",
        body: JSON.stringify(req),
      });
      if (!resp.ok) {
        toast.error("Submit failed with status " + resp.status);
        return;
      }

      const { code, message } = await resp.json();
      if (code !== 0) {
        toast.error(message);
        return;
      }

      toast.success("Thank you for your feedback!");

      setFeedback("");
      setRating(null);
      setShowFeedback(false);
    } catch (error) {
      toast.error("Failed to submit, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const ratings = [
    { emoji: "😞", value: 1 },
    { emoji: "😐", value: 5 },
    { emoji: "😊", value: 10 },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setShowFeedback(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {t("feedback.title")}
            </DialogTitle>
            <DialogDescription className="text-base">
              {t("feedback.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            <Textarea
              placeholder={t("feedback.placeholder")}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[150px] text-base resize-none"
            />
          </div>

          <div className="mt-4 flex flex-col items-start gap-2">
            <p className="text-sm text-muted-foreground">
              {t("feedback.rating_tip")}
            </p>
            <div className="flex flex-row gap-2">
              {ratings.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setRating(item.value)}
                  className={`p-2 text-2xl rounded-lg hover:bg-secondary transition-colors ${
                    rating === item.value ? "bg-secondary" : ""
                  }`}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-start items-center gap-4">
            {socialLinks && socialLinks.length > 0 && (
              <>
                <p className="text-sm text-muted-foreground">
                  {t("feedback.contact_tip")}
                </p>
                <div className="flex gap-4">
                  {socialLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title={link.title}
                    >
                      <Icon name={link.icon || ""} className="text-xl" />
                    </a>
                  ))}
                </div>
              </>
            )}
            <div className="flex-1"></div>
            <div className="flex gap-3">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? t("feedback.loading") : t("feedback.submit")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
