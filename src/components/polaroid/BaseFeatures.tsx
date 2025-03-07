import { useAppState } from "../../hooks/useAppState";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { headers } from "../../constants";
const BaseFeatures = () => {
  const { activePolaroidBase } = useAppState();
  const dispatch = useAppDispatch();
  return (
    <div>
      <header className="flex justify-center relative gap-2 bg-white py-3 text-xs">
        {headers.map((header, idx) => {
          const isActive = activePolaroidBase === header.name;
          return (
            <p
              key={idx}
              className={`rounded-md px-[6px] py-1 cursor-pointer ${
                isActive ? "bg-black text-white" : "bg-[#F5F5F5] text-black"
              }`}
              onClick={() =>
                dispatch({
                  type: "SET_POLAROID_BASE",
                  payload: header.name,
                })
              }
            >
              {header.name}
            </p>
          );
        })}
        <p className="absolute right-4 rounded-[60px] bg-[#C9EC81] py-2 px-4">
          Done
        </p>
      </header>
      <main>
        
      </main>
    </div>
  );
};

export default BaseFeatures;
