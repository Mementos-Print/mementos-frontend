import { useAppState } from "../../hooks/useAppState";
import { headers } from "../../constants";
import Imports from "./Imports";
import Border from "./Border";
import { useSetSelected } from "../../hooks/useSetSelected";

const BaseFeatures = () => {
  const { activePolaroidBase, selectedImages } = useAppState();
  const setSelected = useSetSelected();
  const uploadImage = () =>{
    if(selectedImages.length > 0){
      setSelected("isDone", true);
    }
  }

  return (
    <div>
      <header className="flex justify-center relative gap-2 bg-white py-3 text-xs">
        {headers.map((header, idx) => {
          const isActive = activePolaroidBase === header.name;
          return (
            <p
              key={idx}
              className={`rounded-md px-[6px] py-1 cursor-pointer ${
                isActive ? "bg-[#333431] text-white" : "bg-[#F5F5F5] text-black"
              }`}
              onClick={() => setSelected("activePolaroidBase", header.name)}
            >
              {header.name}
            </p>
          );
        })}
        <p className="absolute right-4 rounded-[60px] bg-[#C9EC81] py-1 px-4" onClick={uploadImage}>
          Done
        </p>
      </header>
      <main className="bg-[#FAFAFA]">
        {activePolaroidBase == "Imports" && <Imports />}
        {activePolaroidBase == "Grid" && <Imports />}
        {selectedImages.length > 0 && activePolaroidBase == "Border" && (
          <Border />
        )}
        {}
      </main>
    </div>
  );
};

export default BaseFeatures;
