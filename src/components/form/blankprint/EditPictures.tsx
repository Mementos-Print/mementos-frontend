import { useState } from "react";
import { ChevronLeft, ChevronRight } from "../../../assets/icons/Icon";

const EditPictures = ({ selectedImages }: { selectedImages: File[] }) => {
   const [currentImage, setCurrentImage] = useState(0)

   const handlePrevImage = () => {
      if (currentImage != 0) {
         setCurrentImage(currentImage - 1)
      } else {
         setCurrentImage(selectedImages.length)
      }
   }

   const handleNextImage = () => {
      if (currentImage != selectedImages.length - 1) {
         setCurrentImage(currentImage + 1)
      }
      else {
         setCurrentImage(0)
      }
   }

   return (
      <div className="h-full flex flex-col justify-center items-center align-middle">
         {selectedImages.length == 0 ?
            <div className="text-lg text-disabledText kanit-light">Select Images to print.</div> :
            <div className="w-1/2 flex flex-row justify-center gap-6 items-center">
               <div className="previous p-2 bg-gradient-to-r from-gradient_from to-disabled rounded-full w-fit h-fit cursor-pointer"
                  onClick={() => handlePrevImage()}>
                  <ChevronLeft />
               </div>

               {selectedImages && <img src={URL.createObjectURL(selectedImages[currentImage])} alt="img" />}

               <div className="previous p-2 bg-gradient-to-r from-gradient_from to-disabled rounded-full w-fit h-fit cursor-pointer"
                  onClick={() => handleNextImage()}>
                  <ChevronRight />
               </div>
            </div>}
      </div>
   )
}

export default EditPictures;