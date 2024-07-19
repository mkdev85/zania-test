import React, { useEffect, useRef, useState } from "react";

import { Draggable, DropResult } from "react-beautiful-dnd";
import dynamic from "next/dynamic";

import Card from "@cat/containers/home-page/components/Card";
import ImageOverlay from "@cat/containers/home-page/components/ImageOverlay";
import { DroppableCustom } from "@cat/containers/home-page/components/Droppable";
import { useOnMount } from "@cat/hooks/useOnMount";

import { getAlbum, type AlbumData } from "@cat/services/getAlbum";
import { updateAlbum } from "@cat/services/updateAlbum";
import { POLLING_TIME_IN_MS } from "@cat/constants";
import { getLastSavedTime } from "@cat/services/getLastSavedTime";

const DragDropContextNoSSR = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);

export const HomePage: React.FC = () => {
  const [items, setItems] = useState<AlbumData[]>([]);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [lastSaveTime, setLastSaveTime] = useState<string>();
  const prevItemsRef = useRef<AlbumData[]>([]);

  useOnMount(() => {
    getAlbum().then((result) => {
      setItems(result.data);
      prevItemsRef.current = result.data;
      setLastSaveTime(result.lastSavedTime);
    });
  });

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (JSON.stringify(prevItemsRef.current) !== JSON.stringify(items)) {
        prevItemsRef.current = items;
        const { isSuccess } = await updateAlbum(items);

        if (isSuccess) {
          const data = await getLastSavedTime();
          setLastSaveTime(data.lastSavedTime);
        }
      }
    }, POLLING_TIME_IN_MS);

    return () => clearInterval(intervalId);
  }, [items]);

  const handleDragEnd = async (result: DropResult) => {
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

  return (
    <div className="container mx-auto p-4">
      <p>{lastSaveTime}</p>
      <DragDropContextNoSSR onDragEnd={handleDragEnd}>
        <DroppableCustom
          droppableId="cards"
          type="droppableListItem"
          direction="horizontal"
        >
          {(provided) => (
            <div
              className="grid grid-cols-3 gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.type}
                  draggableId={item.type}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`col-span-${index < 3 ? "1" : "2"}`}
                    >
                      <Card
                        item={item}
                        onClick={handleCardClick}
                        thumbnail={item.thumbnail}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </DroppableCustom>
      </DragDropContextNoSSR>

      {!!overlayImage && (
        <ImageOverlay imageSrc={overlayImage} onClose={handleCloseOverlay} />
      )}
    </div>
  );
};

HomePage.displayName = "HomePage";
