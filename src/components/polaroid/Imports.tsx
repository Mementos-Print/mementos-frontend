import { useAppState } from "../../hooks/useAppState";
import { useSetSelected } from "../../hooks/useSetSelected";

const Imports = () => {
  const { selectedImages, importedImages } = useAppState();
  const setSelected = useSetSelected();

  const selectImage = (idx: number) => {
    const image = importedImages[idx];
    
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.push(image);
    setSelected("selectedImages", updatedSelectedImages);
  };

  return (
    <div className="grid grid-cols-3 bg-white gap-0.5">
      {importedImages.map((img, idx) => {
        const imageUrl = URL.createObjectURL(img);
        const count = selectedImages.filter(
          (selectedImg) => selectedImg === img
        ).length;
        return (
          <div className="relative" key={idx}>
            <img
              src={imageUrl}
              className="h-28  object-cover"
              onClick={() => selectImage(idx)}
            />

            {count > 0 && (
              <p className="w-6 h-6 bg-[#A1BD67] absolute top-1 left-1 rounded-full text-center font-medium">
                {count}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Imports;
