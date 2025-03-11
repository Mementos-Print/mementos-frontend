import { Cancel } from "../../assets/icons/Icon";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppState } from "../../hooks/useAppState";

const UpperSelected = () => {
  const { selectedImages } = useAppState();
  const dispatch = useAppDispatch();

  const removeSelected = (idx: number) => {
    const updatedSelected = [...selectedImages];
    updatedSelected.splice(idx, 1);
    dispatch({type: "SET_SELECTED", payload2: updatedSelected})
  };
  return (
    <div className="flex items-center gap-0.5 overflow-x-auto mb-12 scroll-bar">
      {selectedImages.map((img, idx) => (
        <div key={idx} className="relative">
          {/* selected-images */}
          <img
            src={img}
            className="w-16 h-16 object-cover rounded-lg border-2 border-[#85995E]"
          />

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
