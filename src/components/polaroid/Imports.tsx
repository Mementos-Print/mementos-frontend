import { useAppState } from "../../hooks/useAppState";
import { Selected } from "../../assets/Logo";
import { useSetSelected } from "../../hooks/useSetSelected";

const Imports = () => {
  const { selectedImages, importedImages } = useAppState();
  const setSelected = useSetSelected();

  const selectImage = (idx: number) => {
    const image = importedImages[idx];
    let updatedSelectedImages = [...selectedImages];

    if (updatedSelectedImages.includes(image))
      updatedSelectedImages = updatedSelectedImages.filter(
        (img) => img !== image
      );
    else updatedSelectedImages.push(image);

    setSelected("selectedImages", updatedSelectedImages);
  };

  return (
    <div className="grid grid-cols-3 bg-white gap-0.5">
      {importedImages.map((img, idx) => (
        <div className="relative" key={idx}>
          <img
            src={img}
            className="h-28  object-cover"
            onClick={() => selectImage(idx)}
          />
          <Selected
            className={`absolute top-0 border-black text-3xl ${
              selectedImages.includes(img) ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default Imports;
