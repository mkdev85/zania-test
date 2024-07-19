import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

interface Item {
  type: string;
  title: string;
}

interface CardProps {
  item: Item;
  onClick: (imageSrc: string) => void;
  thumbnail: string;
}

const Card: React.FC<CardProps> = ({ item, onClick, thumbnail }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = thumbnail;
    image.onload = () => setLoading(false);
  }, [thumbnail]);

  return (
    <div
      className="p-4 border rounded shadow-md cursor-pointer"
      onClick={() => onClick(thumbnail)}
    >
      {loading ? (
        <Spinner />
      ) : (
        <img src={thumbnail} alt={item.title} className="w-full h-32 object-cover" />
      )}
      <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
    </div>
  );
};

export default Card;
