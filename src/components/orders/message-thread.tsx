"use client";

import React, { useState } from "react";
import { MessageSquare, Send, User, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { postOrderMessageAction } from "@/app/actions/orders";
import { formatDate } from "@/lib/utils";
import type { OrderMessage } from "@/lib/data/orders";

interface MessageThreadProps {
  orderId: string;
  orderNumber: string;
  initialMessages: OrderMessage[];
}

export function MessageThread({
  orderId,
  orderNumber,
  initialMessages,
}: MessageThreadProps) {
  const [messages, setMessages] = useState<OrderMessage[]>(initialMessages);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("order_id", orderId);
    formData.append("order_number", orderNumber);
    formData.append("content", content);

    try {
      const res = await postOrderMessageAction(null, formData);
      if (res && !res.success) {
        setErrorMessage(res.message || "Failed to deliver message.");
      } else {
        // Optimistic UI update
        const newMsg: OrderMessage = {
          id: `temp-${Date.now()}`,
          order_id: orderId,
          sender_id: "me",
          sender_name: "You",
          sender_role: "client",
          content: content.trim(),
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMsg]);
        setContent("");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border flex flex-col h-full">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-vermilion" />
            Project Discussion Thread
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {messages.length} messages
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Direct communication with your assigned student team and project leads.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
        {/* Messages List Container */}
        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-xs space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto stroke-1" />
              <p>No messages in this project thread yet.</p>
              <p>Use the form below to say hello or ask questions to the team!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isClient = msg.sender_role === "client";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col space-y-1 ${
                    isClient ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground px-1">
                    <span className="font-semibold text-foreground">
                      {msg.sender_name}
                    </span>
                    <Badge
                      variant={isClient ? "outline" : "secondary"}
                      className="text-[9px] h-4 px-1"
                    >
                      {isClient ? "Client" : "Orvane Studio"}
                    </Badge>
                    <span>• {formatDate(msg.created_at)}</span>
                  </div>

                  <div
                    className={`p-3 rounded-lg max-w-[85%] text-xs leading-relaxed ${
                      isClient
                        ? "bg-vermilion text-white rounded-tr-none"
                        : "bg-muted text-foreground border border-border rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Compose Input Form */}
        <form onSubmit={handleSubmit} className="space-y-2 pt-2 border-t border-border">
          {errorMessage && (
            <div className="text-xs text-destructive flex items-center gap-1.5 pb-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex gap-2">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ask a question, request an update, or send feedback to the team..."
              rows={2}
              className="resize-none text-xs"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="h-auto px-4 bg-vermilion hover:bg-vermilion/90 text-white shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Messages notify the student engineering team via real-time studio inbox and email.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
