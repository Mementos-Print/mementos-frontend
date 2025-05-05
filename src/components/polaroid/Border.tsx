import { GridOptions } from "../../constants/index";
import { useAppState } from "../../hooks/useAppState";
import { useSetSelected } from "../../hooks/useSetSelected";
const Border = () => {
  const setSelected = useSetSelected();

  const { borderOption } = useAppState();
  return (
    <div className="flex flex-col items-center">
      <p className="my-4 text-xs text-[#9E9E9E]">
        Select your preferred border
      </p>
      <div className="grid grid-cols-2 gap-x-8">
        {GridOptions.map((grid, idx) => {
          const { option, name } = grid;
          const isActive = borderOption === name;
          return (
            <div
              key={idx}
              className="relative flex items-center gap-1.5"
              onClick={() => setSelected("borderOption", name)}
            >
              <img src={option} alt={name} />
              <p
                className={`text-xs ${
                  !isActive ? "text-[#9E9E9E]" : "text-[#212121] "
                }`}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </p>

              {/* indicator  */}
              <img
                className={`absolute top-0 right-1/2 ${
                  isActive ? "" : "hidden"
                }`}
                src="/selected-border.svg"
                alt="selected-border"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Border;
