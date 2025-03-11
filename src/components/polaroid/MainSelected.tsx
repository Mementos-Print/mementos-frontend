import { useAppState } from "../../hooks/useAppState";

const MainSelected = () => {
  const {selectedImages} = useAppState();
  return (
    <section className="flex items-center justify-center">
      <div className="h-40 w-4/5 bg-[#D9D9D9] p-3 flex items-center gap-0.5">
      {
        selectedImages.slice(0,2).map((image,idx)=>(
        <div className="bg-white p-2 h-full w-1/2" key={idx}>
          <img src={image} alt="" />
        </div>
        ))
      }
      </div>
    </section>
  );
};

export default MainSelected;
