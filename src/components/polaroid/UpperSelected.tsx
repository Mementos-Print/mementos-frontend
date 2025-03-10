import { useAppState } from "../../hooks/useAppState";

const UpperSelected = () => {
  const { selectedImages } = useAppState();
  return (
    <div className="flex items-center gap-0.5 overflow-x-auto mb-12 scroll-bar">
      {selectedImages.map((img, idx) => (
        <img src={img} key={idx} className="w-16 h-16 object-cover rounded-lg"/>
      ))}
    </div>
  );
};

export default UpperSelected;
