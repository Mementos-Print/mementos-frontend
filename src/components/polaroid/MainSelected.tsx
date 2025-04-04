import { useEffect } from "react";
import { LeftArrow, RightArrow } from "../../assets/icons/Icon";
import { useAppState } from "../../hooks/useAppState";
import { useSetSelected } from "../../hooks/useSetSelected";
import UploadOverlay from "../ui/UploadOverlay";
import PolaroidGenerated from "../ui/PolaroidGenerated";

const MainSelected = () => {
  const { selectedImages, visibleRange, borderOption, isDone, isSuccessful } =
    useAppState();
  const setSelected = useSetSelected();

  const nextItems = () => {
    const [start, end] = visibleRange;
    if (end < selectedImages.length) {
      setSelected("visibleRange", [start + 1, end + 1]);
    }
  };
  const prevItems = () => {
    const [start, end] = visibleRange;
    if (start > 0) {
      setSelected("visibleRange", [start - 1, end - 1]);
    }
  };
  useEffect(() => {
    if (isDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isDone]);
  return (
    <>
      {isDone && <UploadOverlay />}
      {isSuccessful && <PolaroidGenerated />}

      <section className="flex items-center justify-center flex-col gap-y-4">
        <p className="text-center text-[#9E9E9E] text-xs leading-4">
          Select an even number of images for standard e.g 2, 4...
        </p>
        <div className="h-[310px] w-[70%] shadow-2xl">
          {selectedImages
            .slice(visibleRange[0], visibleRange[1])
            .map((image, idx) => {
              const imageUrl = URL.createObjectURL(image);
              return (
                <div
                  className={`border-[10px] border-b-[46px] h-full ${
                    borderOption == "White" ? "border-white" : "border-black"
                  }`}
                  key={idx}
                >
                  <img src={imageUrl} alt="img-selected" className="h-full"/>
                </div>
              );
            })}
        </div>
        <p className="text-sm">
          <span className="text-[#212121]"> {visibleRange[1]}</span>/
          <span className="text-[#9E9E9E]">{selectedImages.length}</span>
        </p>
        <img
          src={RightArrow}
          alt=""
          className="absolute right-2"
          onClick={nextItems}
        />
        <img
          src={LeftArrow}
          alt=""
          className="absolute left-2"
          onClick={prevItems}
        />
      </section>
    </>
  );
};

export default MainSelected;
