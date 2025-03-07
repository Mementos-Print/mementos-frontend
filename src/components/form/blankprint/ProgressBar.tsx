import { CheckIcon } from "../../../assets/icons/Icon";
import { ProgressBarProps } from "../../../types/type";

const ProgressBar = ({ setcurrentsection, activeSection, done }: ProgressBarProps) => {
    return (
        <div className='kanit-light px-5 py-3 w-full flex flex-row justify-between'>
            <button className='flex flex-row gap-1 p-1 items-center' onClick={() => setcurrentsection(1)} disabled >
                <div className=' rounded-full w-[16px] h-[16px] flex justify-center items-center text-white border-secondary border-2 ' style={{ backgroundColor: done.includes(1) ? 'var(--secondary)' : (activeSection === 1  ? 'var(--primary)' : 'white')}}>{
                    done.includes(1) ? <div><CheckIcon color="white"/></div> : <span></span>
                }</div>
                <p className="text-[14px]" style={{ color: activeSection === 1 ? 'var(--primary)' : '#9E9E9E', fontWeight: activeSection === 1 ? '500' : '300'}}>Information</p>
            </button>

            <button className='flex flex-row gap-1 p-1' onClick={() => setcurrentsection(2)}>
                <div className='rounded-full w-[16px] h-[16px] flex justify-center items-center text-white border-secondary border-2' style={{ backgroundColor: done.includes(2) ? 'var(--secondary)' : (activeSection === 2  ? 'var(--primary)' : 'white')}}>{
                    done.includes(2) ? <div className="bg-primary"><CheckIcon color="white"/></div> : <span></span>
                }</div>
                <p className="text-[14px]" style={{ color: activeSection === 2 ? 'var(--primary)' : '#9E9E9E', fontWeight: activeSection === 2 ? '500' : '300' }}>Upload</p>
            </button>

            <button className='flex flex-row gap-1 p-1' onClick={() => setcurrentsection(3)} >
                <p className='rounded-full w-[16px] h-[16px] flex justify-center items-center text-white border-secondary border-2' style={{ backgroundColor: activeSection === 3 ? 'var(--primary)' : 'white' }}><span></span></p>
                <p className="text-[14px]" style={{ color: activeSection === 3 ? 'var(--primary)' : '#9E9E9E', fontWeight: activeSection === 3 ? '500' : '300' }}>Complete</p>
            </button>
        </div>
    );
};

export default ProgressBar;