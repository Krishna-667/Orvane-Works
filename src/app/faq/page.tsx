import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFaqs } from "@/lib/data/content";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about working with Orvane: pricing, delivery, student engineering team, and project workflow.",
};

export const revalidate = 60;

export default async function FaqPage() {
  const faqs = await getFaqs();

  // Group by category
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <div className="container py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <Badge variant="accent">Help & Clarity</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Everything you need to know about our student engineering studio, our
          billing model in INR (₹), and how we execute client projects.
        </p>
      </div>

      {/* FAQs by Category */}
      <div className="space-y-12 max-w-4xl">
        {categories.map((cat) => {
          const categoryFaqs = faqs.filter((f) => f.category === cat);

          return (
            <div key={cat} className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground pb-2 border-b border-border">
                {cat}
              </h2>
              <div className="space-y-4">
                {categoryFaqs.map((faq) => (
                  <Card key={faq.id}>
                    <CardHeader className="py-4">
                      <CardTitle className="text-base sm:text-lg font-semibold text-foreground">
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Still have questions */}
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 md:p-12 text-center max-w-2xl mx-auto space-y-4">
        <h3 className="font-display text-2xl font-bold text-foreground">
          Still have a question?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We reply to every inquiry within 24 hours. Send us a message or chat
          directly with our student lead on WhatsApp.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/contact">
            <Button size="lg" className="font-semibold gap-2">
              Send us a message
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
