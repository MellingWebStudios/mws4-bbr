import React, { useState, useEffect } from 'react';

interface LiteYouTubeEmbedProps {
  id: string; // YouTube video ID
  title?: string;
  className?: string;
}

const LiteYouTubeEmbed: React.FC<LiteYouTubeEmbedProps> = ({ id, title = 'YouTube video', className }) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  useEffect(() => {
    setIsIframeLoaded(false);
  }, [id]);

  return (
    <div className={`relative w-full aspect-video bg-black overflow-hidden rounded-lg shadow ${className || ''}`}>
      {isIframeLoaded ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full absolute top-0 left-0 border-0"
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          className="w-full h-full absolute top-0 left-0 flex items-center justify-center group"
          style={{ background: `url(${thumbnail}) center center / cover no-repeat` }}
          aria-label={`Play ${title}`}
          onClick={() => setIsIframeLoaded(true)}
        >
          <span className="inline-flex items-center justify-center bg-black/70 rounded-full p-4 group-hover:bg-red-600 transition-colors">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="white" fillOpacity="0.8" />
              <polygon points="20,16 34,24 20,32" fill="#e53e3e" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default LiteYouTubeEmbed;
