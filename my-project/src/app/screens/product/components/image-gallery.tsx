"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { Button } from "@/app/components/ui/button"

interface ImageGalleryProps {
  images: string[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-square">
        <div className="relative w-full h-full group">
          <Image
            src={images[currentImage] || "/placeholder.svg"}
            alt={`Product image ${currentImage + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Zoom/Fullscreen button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setShowLightbox(true)}
          >
            <Maximize2 className="h-5 w-5" />
          </Button>

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative w-20 h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2",
              currentImage === index ? "border-primary" : "border-transparent",
            )}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-4xl max-h-screen p-4">
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt={`Product image ${currentImage + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[90vh]"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
