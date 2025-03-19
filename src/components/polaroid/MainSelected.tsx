import { LeftArrow, RightArrow } from "../../assets/icons/Icon";
import { useAppState } from "../../hooks/useAppState";

const MainSelected = () => {
  const { selectedImages } = useAppState();
  return (
    <section className="flex items-center justify-center ">
      <div className="h-40 w-4/5 bg-[#D9D9D9] p-3 flex items-center gap-4 flex items-center">
        {selectedImages.slice(0, 2).map((image, idx) => (
          <div
            className="border-8 border-white bg-white h-full w-1/2"
            key={idx}
          >
            <img src={image} alt="" />
          </div>
        ))}
      </div>
      <img src={RightArrow} alt="" className="absolute right-2" />
      <img src={LeftArrow} alt="" className="absolute left-2" />
    </section>
  );
};

export default MainSelected;
