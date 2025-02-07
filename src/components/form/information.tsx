import { FormDataInformation } from "../../types/type";

const Information = ({ sectionData, activeSection, handleChange, handleNext }: FormDataInformation) => (
  <form onSubmit={handleNext}>
    <h2 className="text-2xl font-bold mb-4">Information</h2>

    <div className=' text-primary '>
      <label className="relative bg-white -mb-2 ml-4 z-10 w-fit px-1 rounded-sm block text-[10px]">Name</label>
      <input
        className="border p-2 mb-4 w-full rounded-md border-ashBorder"
        placeholder='Name'
        type="text"
        name="name"
        // value={sectionData.name}
        onChange={(e) => handleChange(e, activeSection)}
        required
      />
    </div>

    <div className='text-primary '>
      <label className="relative bg-white -mb-2 ml-4 z-10 w-fit px-1 rounded-sm block text-[10px]">Email</label>
      <input
        className="border p-2 mb-4 w-full rounded-md border-ashBorder"
        placeholder='Email'
        type="text"
        name="email"
        // value={sectionData.name}
        onChange={(e) => handleChange(e, activeSection)}
        required
      />
    </div>

    <div className='flex flex-row items-end gap-3 justify-end text-[12px] pt-5'>
      <button className=" bg-disabled text-disabledText px-4 py-2 rounded">Previous</button>
      <button type="submit" className=" bg-primary text-white px-4 py-2 rounded">Next</button>
    </div>
  </form>
);

export default Information;