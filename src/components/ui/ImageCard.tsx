import { CheckIcon } from "../../assets/icons/Icon"
import { Item } from "../../types/type"

const ImageCard = ({ data, handleClickedImages, selectedImagesId }: { data: Item, handleClickedImages: (item: Item) => void, selectedImagesId: Item[] }) => {

    return (
        <li className="w-1/3 border border-gray_ border-collapse hover:cursor-pointer" onClick={() => handleClickedImages(data)}>
            {Object.values(selectedImagesId).includes(data) ?
                <div className="!z-10 -mb-8 ml-2 mt-2 relative left-0 float-left p-1 bg-secondary rounded-full w-fit ">
                    <CheckIcon color='var(--primary)' />
                </div> :
                <span></span>}
            <div>
                <div>
                    <img src={data.image} alt="" />
                </div>
                <p>{data.name}</p>
            </div>
        </li>
    )
}

export default ImageCard;