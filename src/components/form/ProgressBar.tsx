import { CheckIcon } from "../../assets/icons/Icon";
import { ProgressBarProps } from "../../types/type";

const ProgressBar = ({ setcurrentsection, activeSection, done }: ProgressBarProps) => {
    return (
        <div className=' w-full flex flex-row justify-between'>
            <button className='flex flex-row gap-1 p-1 items-center' onClick={() => setcurrentsection(1)} >
                <p className=' rounded-full w-[20px] h-[20px] flex justify-center items-center text-white' style={{ backgroundColor: done.includes(1) ? 'var(--secondary)' : (activeSection === 1  ? 'var(--primary)' : '#9E9E9E')}}>{
                    done.includes(1) ? <div><CheckIcon /></div> : <span>1</span>
                }</p>
                <p className="text-[14px]" style={{ color: activeSection === 1 ? 'var(--primary)' : '#9E9E9E', fontWeight: activeSection === 1 ? '600' : '400'}}>Information</p>
            </button>
            <button className='flex flex-row gap-1 p-1' onClick={() => setcurrentsection(2)}>
                <p className='rounded-full w-[20px] h-[20px] flex justify-center items-center text-white' style={{ backgroundColor: done.includes(2) ? 'var(--secondary)' : (activeSection === 2  ? 'var(--primary)' : '#9E9E9E')}}>{
                    done.includes(2) ? <div className="bg-primary"><CheckIcon /></div> : <span>2</span>
                }</p>
                <p className="text-[14px]" style={{ color: activeSection === 2 ? 'var(--primary)' : '#9E9E9E', fontWeight: activeSection === 2 ? '600' : '400' }}>Upload</p>
            </button>
            <button className='flex flex-row gap-1 p-1' onClick={() => setcurrentsection(3)} >
                <p className='rounded-full w-[20px] h-[20px] flex justify-center items-center text-white' style={{ backgroundColor: activeSection === 3 ? 'var(--primary)' : '#9E9E9E' }}><span>3</span></p>
                <p className="text-[14px]" style={{ color: activeSection === 3 ? 'var(--primary)' : '#9E9E9E', fontWeight: activeSection === 3 ? '600' : '400' }}>Complete</p>
            </button>
        </div>
    );
};

export default ProgressBar;