import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppState } from "../../hooks/useAppState";
import { Selected } from "../../assets/Logo";

const Imports = () => {
  const { selectedImages, importedImages } = useAppState();
  const dispatch = useAppDispatch();

  const selectImage = (idx: number) => {
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.unshift(importedImages[idx]);

    dispatch({ type: "SET_SELECTED", payload2: updatedSelectedImages });
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
          <Selected className={`absolute top-0 border-black text-3xl`} />
        </div>
      ))}
    </div>
  );
};

export default Imports;
