"use client";

import React, { useState } from "react";
import { Star, Sparkles, CheckCircle2, MessageSquareQuote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { submitOrderReviewAction } from "@/app/actions/orders";

interface ReviewModalProps {
  orderId: string;
  orderNumber: string;
}

export function ReviewModal({ orderId, orderNumber }: ReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("order_id", orderId);
    formData.append("rating", rating.toString());

    try {
      const res = await submitOrderReviewAction(null, formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.message || "Failed to submit review.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 font-medium">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          Leave a Project Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-vermilion" />
            Review Your Experience with Orvane
          </DialogTitle>
          <DialogDescription className="text-xs">
            Your feedback helps our student engineering team grow and assists future clients across Tamil Nadu.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-base text-foreground">
              Thank You for Your Review!
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Your testimonial has been safely recorded. Once reviewed by our founders, it will appear on the Orvane public site.
            </p>
            <Button
              onClick={() => {
                setOpen(false);
                setSubmitted(false);
              }}
              variant="outline"
              size="sm"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {errorMessage && (
              <div className="text-xs text-destructive bg-destructive/10 p-2.5 rounded border border-destructive/20">
                {errorMessage}
              </div>
            )}

            {/* Star Rating Selector */}
            <div className="space-y-1.5 text-center sm:text-left">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Overall Satisfaction
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = (hoverRating || rating) >= star;
                  return (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          filled
                            ? "text-amber-500 fill-amber-500"
                            : "text-muted stroke-1"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs font-semibold text-muted-foreground ml-2">
                  {rating} of 5 stars
                </span>
              </div>
            </div>

            {/* Client Role & Company */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Your Role &amp; Business Name <span className="text-vermilion">*</span>
              </label>
              <Input
                name="client_role_company"
                required
                placeholder="e.g. Founder, Meenakshi Sweets or Clinic Director"
                className="text-xs"
              />
            </div>

            {/* Review Content */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Your Testimonial <span className="text-vermilion">*</span>
              </label>
              <Textarea
                name="content"
                required
                rows={4}
                placeholder="Share your experience working with Orvane: the quality of delivery, speed of communication, and technical outcome..."
                className="text-xs"
              />
              <p className="text-[10px] text-muted-foreground">
                All client reviews are moderated by Orvane studio admins before being published to the website.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                size="sm"
                className="bg-vermilion hover:bg-vermilion/90 text-white font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
