import { Cancel } from "../../assets/icons/Icon";
import { useAppState } from "../../hooks/useAppState";
import { useSetSelected } from "../../hooks/useSetSelected";

const UpperSelected = () => {
  const { selectedImages } = useAppState();
  const setSelected = useSetSelected();

  const removeSelected = (idx: number) => {
    const updatedSelected = [...selectedImages];
    updatedSelected.splice(idx, 1);
    setSelected("selectedImages", updatedSelected)

  };
  return (
    <div className="flex items-center gap-0.5 mb-5  overflow-x-auto scroll-bar">
      {selectedImages.map((img, idx) => (
        <div key={idx} className="relative shrink-0">
          <img
            src={img}
            className="w-[74px] h-[74px] object-cover rounded-lg border-2 border-[#85995E]"
          />
          {/* selected-images */}

          {/* cancel button */}
          <img
            className="absolute top-[2.25px] right-[2.25px]"
            src={Cancel}
            alt="Cancel Button"
            onClick={() => removeSelected(idx)}
          />
        </div>
      ))}
    </div>
  );
};

export default UpperSelected;
