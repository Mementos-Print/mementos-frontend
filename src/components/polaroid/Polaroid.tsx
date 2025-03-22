import { useAppState } from "../../hooks/useAppState";
import BaseFeatures from "./BaseFeatures";
import UploadImage from "../ui/UploadImage";
import SelectToPrint from "../ui/SelectToPrint";
import SelectedImageLayout from "./SelectedImageLayout";

const PolaroidIndex = () => {
  const {selectedImages,importedImages } = useAppState();
  return (
    <div className="bg-[#F5F5F5]">
      <div className="py-10 px-4">
        {selectedImages.length > 0 ? (
          <SelectedImageLayout />
        ) : importedImages.length>0 ? (
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
