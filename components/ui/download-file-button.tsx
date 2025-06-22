"use client"

import type * as React from "react"
import { FileIcon, DownloadIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DownloadFileButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  
  fileName: string
  label?: string
  variant?: "default" | "compact"
}

export function DownloadFileButton({
  fileName,
  label,
  variant = "default",
  className,
  ...props
}: DownloadFileButtonProps) {
  return (
    <a
      className={cn(
        "group flex cursor-pointer flex-col items-center rounded-lg border bg-card p-4 shadow-sm transition-all hover:bg-accent/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "compact" ? "w-[120px]" : "w-[180px]",
        className,
      )}
      {...props}
    >
      <div className="relative mb-2 flex h-16 w-12 items-center justify-center">
        <FileIcon
          className={cn(
            "absolute h-16 w-12 text-muted-foreground transition-colors group-hover:text-primary",
          )}
        />
        </div>
      <div className="flex w-full flex-col items-center text-center">
        <span className="line-clamp-2 text-sm font-medium">{label || fileName}</span>
      </div>
      <div className="mt-2 flex items-center justify-center rounded-full bg-primary p-1 opacity-0 transition-opacity group-hover:opacity-100">
        <DownloadIcon className="h-4 w-4 text-primary-foreground" />
      </div>
    </a>
  )
}
