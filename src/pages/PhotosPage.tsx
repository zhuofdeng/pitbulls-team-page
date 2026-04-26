import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';

interface Photo {
  src: string;
  caption: string;
}

const photos: Photo[] = [
  { src: '/photos/7751.JPG', caption: '' },
  { src: '/photos/7754.JPG', caption: '.' },
  { src: '/photos/7761.JPG', caption: '' },
  { src: '/photos/7765.JPG', caption: '' },
  { src: '/photos/7766.JPG', caption: '' },
  { src: '/photos/7767.JPG', caption: '' },
  { src: '/photos/7769.JPG', caption: '' },
  { src: '/photos/7770.JPG', caption: '' },
  { src: '/photos/7771.JPG', caption: '' },
  { src: '/photos/IMG_3599.JPG', caption: '' },
  { src: '/photos/IMG_3600.JPG', caption: '' },
  { src: '/photos/IMG_3601.JPG', caption: '' },
  { src: '/photos/IMG_3602.JPG', caption: '' },
  { src: '/photos/IMG_3603.JPG', caption: '' },
  { src: '/photos/IMG_3604.JPG', caption: '' },
  { src: '/photos/IMG_3605.JPG', caption: '' },
  { src: '/photos/IMG_3606.JPG', caption: '' },
];

const PhotosPage: React.FC = () => {
  const [selected, setSelected] = useState<Photo | null>(null);

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <section className="bg-primary-800 text-white py-10">
        <div className="container-custom">
          <div className="flex items-center mb-2">
            <Camera size={24} className="mr-2" />
            <h1 className="heading-lg">Team Photos</h1>
          </div>
          <p className="opacity-80">Memories from the season</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-10">
        <div className="container-custom">
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  className="group relative overflow-hidden rounded-lg aspect-square bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  onClick={() => setSelected(photo)}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {photo.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {photo.caption}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Camera size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No photos yet — check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <div
            className="max-w-4xl w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selected.src}
              alt={selected.caption}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            {selected.caption && (
              <p className="text-white text-center mt-3 text-sm">{selected.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosPage;
