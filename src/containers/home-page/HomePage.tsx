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
import { PageLoader } from "@cat/ui-kit/PageLoader/PageLoader";
import { useSnackbar } from "notistack";
import LastSavedTime from "./components/LastSavedTime";
import { isObjectsEqual } from "@cat/helpers";

const DragDropContextNoSSR = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);

export const HomePage: React.FC = () => {
  const [items, setItems] = useState<AlbumData[]>([]);
  const [isChangesDetected, setChangesDetected] = useState<boolean>(false);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);

  const [lastSaveTime, setLastSaveTime] = useState<number>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const prevItemsRef = useRef<AlbumData[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useOnMount(() => {
    setIsFetching(true);
    getAlbum()
    .then((result) => {
      setItems(result.data);
      prevItemsRef.current = result.data;
      setLastSaveTime(result.lastSavedTime);
    })
    .catch(() => {
      enqueueSnackbar({
        message: "Error while fetching the Album data!!",
        variant: "error",
      });
    }).finally(() => {
      setIsFetching(false);
    });
  });

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!isObjectsEqual(prevItemsRef.current, items)) {
        setChangesDetected(true);
        prevItemsRef.current = items;
        const { isSuccess } = await updateAlbum(items);

        if (isSuccess) {
          enqueueSnackbar({
            message: "Saved last snapshot successfully!!",
            variant: "info",
          });
          setLastSaveTime(Date.now());
        } else {
          enqueueSnackbar({
            message: "Error while storing the last snapshop!!",
            variant: "error",
          });
        }
        setChangesDetected(false);
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

  if (isFetching) {
    return <PageLoader />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between w-full my-5 ">
        {
          isChangesDetected && (<p className="text-left text-green-900 font-medium blink"> 
            Changes Detected!! New Snapshop saving is in progress... 
          </p>)  
        }
        <LastSavedTime time={lastSaveTime}/>
      </div>
      
      
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
