"use client";

import React from "react";
import {
  FileText,
  Download,
  PackageCheck,
  FolderOpen,
  FileArchive,
  FileCode,
  FileImage,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { OrderFile } from "@/lib/data/orders";

interface FilesCardProps {
  files: OrderFile[];
  orderNumber: string;
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.round(bytes / 1024)} KB`;
}

function getFileIcon(mimeType: string) {
  if (mimeType.includes("zip") || mimeType.includes("tar") || mimeType.includes("compressed")) {
    return FileArchive;
  }
  if (mimeType.includes("image")) {
    return FileImage;
  }
  if (mimeType.includes("pdf")) {
    return FileText;
  }
  return FileCode;
}

export function FilesCard({ files, orderNumber }: FilesCardProps) {
  const deliverables = files.filter((f) => f.is_deliverable);
  const references = files.filter((f) => !f.is_deliverable);

  const handleDownload = (file: OrderFile) => {
    // In production, triggers Supabase private signed URL download.
    // For demo/browser safety, trigger standard safe download or alert.
    alert(`Downloading ${file.file_name} from private vault...`);
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-vermilion" />
            Deliverables &amp; Project Files
          </CardTitle>
          <CardDescription className="text-xs">
            Stored in private encrypted studio storage with temporary signed download URLs.
          </CardDescription>
        </div>
        <Badge variant="outline" className="text-xs">
          {files.length} total files
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        {/* Deliverables Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-500" />
              Final Deliverables ({deliverables.length})
            </h4>
          </div>

          {deliverables.length === 0 ? (
            <div className="p-4 rounded-lg bg-muted/20 border border-dashed border-border text-center text-xs text-muted-foreground">
              No final deliverables uploaded yet. Deliverables appear here upon milestone completion.
            </div>
          ) : (
            <div className="space-y-2">
              {deliverables.map((file) => {
                const Icon = getFileIcon(file.mime_type);
                return (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:border-vermilion/40 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {file.file_name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {formatFileSize(file.file_size)} • Uploaded by {file.uploader_name} on {formatDate(file.created_at)}
                        </p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(file)}
                      className="gap-1.5 text-xs shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Reference Assets Section */}
        <div className="space-y-3 pt-2 border-t border-border">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5 text-muted-foreground" />
            Client References &amp; Brand Assets ({references.length})
          </h4>

          {references.length === 0 ? (
            <div className="p-4 rounded-lg bg-muted/20 border border-dashed border-border text-center text-xs text-muted-foreground">
              No reference files uploaded.
            </div>
          ) : (
            <div className="space-y-2">
              {references.map((file) => {
                const Icon = getFileIcon(file.mime_type);
                return (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border/80 bg-muted/10 text-xs gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {file.file_name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {formatFileSize(file.file_size)} • {formatDate(file.created_at)}
                        </p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(file)}
                      className="h-7 px-2 text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
