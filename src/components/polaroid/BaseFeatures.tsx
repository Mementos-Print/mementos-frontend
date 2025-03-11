import { useAppState } from "../../hooks/useAppState";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { headers } from "../../constants";
import { Selected } from "../../assets/Logo";
// import { images } from "./dummy";

const BaseFeatures = () => {
  const { activePolaroidBase, selectedImages, importedImages } = useAppState();
  const dispatch = useAppDispatch();

  const selectImage = (idx: number) => {
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.unshift(importedImages[idx]);

    dispatch({ type: "SET_SELECTED", payload2: updatedSelectedImages });
  };
  return (
    <div>
      <header className="flex justify-center relative gap-2 bg-white py-3 text-xs bg-[#FAFAFA]">
        {headers.map((header, idx) => {
          const isActive = activePolaroidBase === header.name;
          return (
            <p
              key={idx}
              className={`rounded-md px-[6px] py-1 cursor-pointer ${
                isActive ? "bg-[#333431] text-white" : "bg-[#F5F5F5] text-black"
              }`}
              onClick={() =>
                dispatch({
                  type: "SET_POLAROID_BASE",
                  payload: header.name,
                })
              }
            >
              {header.name}
            </p>
          );
        })}
        <p className="absolute right-4 rounded-[60px] bg-[#C9EC81] py-1 px-4">
          Done
        </p>
      </header>
      <main>
        <div className="grid grid-cols-3 bg-white gap-0.5">
          {importedImages.map((img, idx) => (
            <div className="relative" key={idx}>
              <img
                src={img}
                className="h-28  object-cover"
                onClick={() => selectImage(idx)}
              />
              <Selected className={`absolute top-0 border-black text-3xl` }/>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BaseFeatures;
