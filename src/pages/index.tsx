import { useState, useEffect } from 'react';
import { Draggable, DropResult } from 'react-beautiful-dnd';

import dynamic from 'next/dynamic';

import Card from '@/components/Card';
import ImageOverlay from '@/components/ImageOverlay';
import { DroppableCustom } from '@/components/Droppable';

interface Item {
  type: string;
  title: string;
  position: number;
}

const thumbnailMap: { [key: string]: string } = {
  'bank-draft': '/images/bank-draft.png',
  'bill-of-lading': '/images/bill-of-lading.png',
  'invoice': '/images/invoice.png',
  'bank-draft-2': '/images/bank-draft-2.png',
  'bill-of-lading-2': '/images/bill-of-lading-2.png',
};

const DragDropContextNoSSR = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.DragDropContext),
  { ssr: false }
);

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    setItems(updatedItems);
  };

  const handleCardClick = (imageSrc: string) => {
    setOverlayImage(imageSrc);
  };

  const handleCloseOverlay = () => {
    setOverlayImage(null);
  };
  console.log('GRID', items)

  return (
    <div className="container mx-auto p-4">
      <DragDropContextNoSSR onDragEnd={handleDragEnd}>
        <DroppableCustom droppableId="cards" direction='horizontal'>
          {(provided) => (
            <div
              className="grid grid-cols-3 gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                items.map((item, index) => (
                  <Draggable key={item.type} draggableId={item.type} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`col-span-${index < 3 ? '1' : '2'}`}
                      >
                        <Card 
                          item={item} 
                          onClick={handleCardClick} 
                          thumbnail={thumbnailMap[item.type]} 
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </DroppableCustom>
      </DragDropContextNoSSR>
      {overlayImage && (
        <ImageOverlay 
          imageSrc={overlayImage} 
          onClose={handleCloseOverlay} 
        />
      )}
    </div>
  );
};

export default Home;
