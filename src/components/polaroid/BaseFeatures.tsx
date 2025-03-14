import { useAppState } from "../../hooks/useAppState";
import { headers } from "../../constants";
import Imports from "./Imports";
import Border from "./Border";
import { useSetOption } from "../../hooks/useSetOption";

const BaseFeatures = () => {
  const { activePolaroidBase, selectedImages } = useAppState();
  const setOption = useSetOption();

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
              onClick={() => setOption("activePolaroidBase", header.name)}
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
