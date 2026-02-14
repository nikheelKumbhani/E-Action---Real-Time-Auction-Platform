"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { cn } from "@/app/lib/utils"

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
      <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 aspect-square">
        <div className="relative w-full h-full group">
          <Image
            src={images[currentImage] || "/placeholder.svg"}
            alt={`Product image ${currentImage + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Zoom/Fullscreen button */}
          <button
            className="absolute top-2 right-2 bg-white/90 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
            onClick={() => setShowLightbox(true)}
          >
            <Maximize2 className="h-5 w-5 text-emerald-600" />
          </button>

          {/* Navigation arrows */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6 text-emerald-600" />
          </button>

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6 text-emerald-600" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative w-20 h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all",
              currentImage === index ? "border-emerald-600 ring-2 ring-emerald-600 ring-offset-2" : "border-gray-300 hover:border-emerald-400",
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
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-emerald-600/80 hover:bg-emerald-600 p-3 rounded-lg transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-600/80 hover:bg-emerald-600 p-3 rounded-lg transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
