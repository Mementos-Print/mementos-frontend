import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "../../../assets/icons/Icon";
import * as fabric from 'fabric';
import { FabricImage } from 'fabric';
import useStoreContext from "../../../useStoreContext";

const EditPictures = ({ selectedImages }: { selectedImages: File[] }) => {
   const [currentImage, setCurrentImage] = useState(0);
   const { borderColor, canvasRef } = useStoreContext();

   const handlePrevImage = () => {
      setCurrentImage((prev) => (prev === 0 ? selectedImages.length - 1 : prev - 1));
   };

   const handleNextImage = () => {
      setCurrentImage((prev) => (prev === selectedImages.length - 1 ? 0 : prev + 1));
   };

   const canvasWidth = window.innerWidth * (3.5 / 5);
   const canvasHeight = (window.innerHeight * (2 / 5)) + 50;

   useEffect(() => {
      const canvas = new fabric.Canvas("canvas", {
         width: canvasWidth,
         height: canvasHeight,
         backgroundColor: borderColor,
      });
      canvasRef.current = canvas;

      return () => {
         canvasRef.current?.dispose();
      };
   }, [borderColor, selectedImages]);

   useEffect(() => {
      if (canvasRef.current && selectedImages.length > 0) {
         const canvas = canvasRef.current;
         const imageUrl = URL.createObjectURL(selectedImages[currentImage]);

         const imageWidth = canvasWidth - 30;
         const imageHeight = canvasHeight - 45;

         // Clear previous images from canvas
         canvas.clear();

         const rect = new fabric.Rect({
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: borderColor,
            fill: borderColor,
            selectable: false,
            hasControls: false, 
            hasBorders: false,
         })
         canvas.add(rect);

         const clipPath = new fabric.Rect({
            left: 15,
            top: 15,
            width: imageWidth,
            height: imageHeight,
            absolutePositioned: true,
         });
 
         FabricImage.fromURL(imageUrl).then((img) => {
            if (img) {
               img.scaleToHeight(imageHeight);
               img.scaleToWidth(imageWidth);

               const scaleX = imageWidth / img.width!;
               const scaleY = imageHeight / img.height!;
               const scale = Math.max(scaleX, scaleY); // Ensures full coverage

               img.set({
                  scaleX: scale,
                  scaleY: scale,
                  left: (canvasWidth - img.width! * scale) / 2,
                  top: (canvasHeight - img.height! * scale) / 2,
                  selectable: false,
                  hasControls: false,
                  hasBorders: true,
                  clipPath: clipPath,
               });
               canvas.add(img);
               canvas.renderAll();
               URL.revokeObjectURL(imageUrl); // Cleanup
            }
         }).catch((error) => {
            console.error("Failed to load image:", error);
         });
      }
   }, [currentImage, selectedImages, borderColor]);

   return (
      <div className="h-2/3 px-3 my-3 flex flcex-col justify-center items-center align-middle">
         {selectedImages.length === 0 ? ( 
            <div className=" text-lg text-disabledText kanit-light text-center">
               Select Images to print.
            </div>
         ) : (
            <div className="w-full h-full flex flex-row justify-center gap-3 items-center align-middle">
               <div
                  className="previous w-1/12 h-fit cursor-pointer" 
                  onClick={handlePrevImage}
               >
                  <div className="w-[30px] h-[30px] flex justify-center items-center bg-gradient-to-r from-gradient_from to-disabled rounded-full">
                     <ChevronLeft />
                  </div>
               </div>

               <div className="w-4/5">
                  <canvas id="canvas"></canvas>
               </div>

               <div
                  className="previous  w-1/12  h-fit cursor-pointer "
                  onClick={handleNextImage}
               >
                  <div className="w-[30px] h-[30px] flex justify-center items-center bg-gradient-to-r from-gradient_from to-disabled rounded-full">
                     <ChevronRight />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default EditPictures;