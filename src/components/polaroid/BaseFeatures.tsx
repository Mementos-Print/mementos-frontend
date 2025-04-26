import { useAppState } from "../../hooks/useAppState";
import { headers } from "../../constants";
import Imports from "./Imports";
import Border from "./Border";
import { useSetSelected } from "../../hooks/useSetSelected";
import { uploadPolaroidImages } from "../../api/userAuth";

const BaseFeatures = () => {
  const { activePolaroidBase, selectedImages, borderOption } = useAppState();
  const setSelected = useSetSelected();

  const uploadImage = async() => {
    const response = await uploadPolaroidImages(selectedImages, borderOption);

    if (response) {
      console.log('Submitted');
      setSelected("isDone", true);

    } else {
      console.log('error');
    }
    if (selectedImages.length > 0) {
    }
  };

  return (
    <div>
      <header className="flex justify-center relative gap-2 bg-white py-3 text-xs">
        {headers.map((header, idx) => {
          const isActive = activePolaroidBase === header.name;
          return (
            <p
              key={idx}
              className={`rounded-md px-[6px] py-1 cursor-pointer ${isActive ? "bg-[#333431] text-white" : "bg-[#F5F5F5] text-black"
                }`}
              onClick={() => setSelected("activePolaroidBase", header.name)}
            >
              {header.name}
            </p>
          );
        })}
        <p
          className={`absolute right-4 rounded-[60px]  cursor-pointer py-1 px-4 ${selectedImages.length > 0 ? "bg-[#C9EC81]" : "bg-[#E0E0E0] text-[#BDBDBD]"}`}
          onClick={uploadImage}
        >
          Done
        </p>
      </header>
      <main className="bg-[#FAFAFA]">
        {activePolaroidBase == "Imports" && <Imports />}
        {activePolaroidBase == "Grid" && <Imports />}
        {selectedImages.length > 0 && activePolaroidBase == "Border" && (
          <Border />
        )}
        { }
      </main>
    </div>
  );
};

export default BaseFeatures;
