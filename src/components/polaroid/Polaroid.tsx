import { useAppState } from "../../hooks/useAppState";
import BaseFeatures from "./BaseFeatures";
import UploadImage from "../ui/UploadImage";
import SelectToPrint from "../ui/SelectToPrint";
import SelectedImageLayout from "./SelectedImageLayout";

const PolaroidIndex = () => {
  const { onUpload, selectedImages } = useAppState();
  return (
    <div className="bg-[#F5F5F5]">
      <div className="py-10 px-4">
        {selectedImages.length > 0 ? (
          <SelectedImageLayout />
        ) : onUpload ? (
          <SelectToPrint />
        ) : (
          <UploadImage />
        )}
      </div>
      <BaseFeatures />
    </div>
  );
};

export default PolaroidIndex;
