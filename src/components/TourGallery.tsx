import React, { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize } from 'react-icons/fi';

interface TourGalleryProps {
  images: string[];
}

export default function TourGallery({ images }: TourGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return;

    switch (e.key) {
      case 'ArrowLeft':
        goToPrevious();
        break;
      case 'ArrowRight':
        goToNext();
        break;
      case 'Escape':
        closeLightbox();
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="relative">
      {/* Main Gallery Grid */}
      <div className={`grid gap-4 ${showAll ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-4'}`}>
        {(showAll ? images : images.slice(0, 5)).map((image, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            className={`relative cursor-pointer group overflow-hidden rounded-lg ${
              !showAll && index === 0 ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <img
              src={image}
              alt={`Tour image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              style={{ aspectRatio: !showAll && index === 0 ? '16/9' : '4/3' }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 text-white flex items-center">
                <FiMaximize className="mr-2" />
                <span className="text-sm font-medium">View larger</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {images.length > 5 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-colors flex items-center space-x-2"
        >
          <FiMaximize className="w-4 h-4" />
          <span>Show all {images.length} photos</span>
        </button>
      )}

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center backdrop-blur-sm">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="relative max-w-7xl mx-auto px-4">
            <img
              src={images[selectedImage]}
              alt={`Tour image ${selectedImage + 1}`}
              className="max-h-[85vh] max-w-full object-contain mx-auto"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
          
          <button
            onClick={goToNext}
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}