import React from "react";

import { useOnMount } from "@cat/hooks/useOnMount";

interface ImageOverlayProps {
  imageSrc: string;
  onClose: () => void;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ imageSrc, onClose }) => {
  useOnMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <img src={imageSrc} alt="Overlay" className="max-w-full max-h-full" />
    </div>
  );
};

export default React.memo(ImageOverlay);
