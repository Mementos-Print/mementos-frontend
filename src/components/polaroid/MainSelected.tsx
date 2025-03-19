import { LeftArrow, RightArrow } from "../../assets/icons/Icon";
import { useAppState } from "../../hooks/useAppState";
import { useSetSelected } from "../../hooks/useSetSelected";

const MainSelected = () => {
  const { selectedImages,visibleRange } = useAppState();
  const setSelected = useSetSelected();
  console.log(visibleRange)

  const nextItems=()=>{
    const [start, end] = visibleRange;
    if(end<selectedImages.length){
      setSelected("visibleRange", [start+1, end+1])
    }
  }
  const prevItems=()=> {
    const [start,end] = visibleRange;
    if(start>0){
      setSelected("visibleRange", [start-1, end-1])
    }
  }
  return (
    <section className="flex items-center justify-center ">
      <div className="h-[310px] w-[70%] shadow-2xl">
        {selectedImages.slice(visibleRange[0], visibleRange[1]).map((image, idx) => (
          <div
            className="border-[10px] border-b-[46px] border-black h-full "
            key={idx}
          >
            <img src={image} alt="" />
          </div>
        ))}
      </div>
      <img src={RightArrow} alt="" className="absolute right-2" onClick={nextItems}/>
      <img src={LeftArrow} alt="" className="absolute left-2" onClick={prevItems}/>
    </section>
  );
};

export default MainSelected;
