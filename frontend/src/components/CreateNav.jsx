const CreateNav = () => {
    return (<div className="overlap bg-white border border-black rounded-lg shadow-md h-[282px] left-[165px] absolute top-[122px] w-[260px]">
        <div className="overlap-group bg-black bg-opacity-10 rounded-lg h-[60px] left-[16px] absolute top-[17px] w-[228px]">
            <div className="group h-[46px] left-[12px] absolute top-[7px] w-[104px]">
                <div className="text-wrapper text-black font-normal text-[18px] leading-none absolute top-[0] left-[0]">Step 1</div>
                <div className="text-wrapper-2 text-[#00000080] font-normal text-[14px] leading-none absolute top-[27px] left-[0]">Choose Images</div>
            </div>
            <img
                className="vector h-[13px] left-[202px] absolute top-[24px] w-[7px]"
                alt="Vector"
                src="https://cdn.animaapp.com/projects/65dc6c88c695d9b9e2297b85/releases/65dc6d584d11273f918e4efd/img/vector-10.svg"
            />
        </div>
        <div className="group-2 h-[46px] left-[28px] absolute top-[118px] w-[77px]">
            <div className="text-wrapper text-black font-normal text-[18px] leading-none absolute top-[0] left-[0]">Step 2</div>
            <div className="text-wrapper-2 text-[#00000080] font-normal text-[14px] leading-none absolute top-[27px] left-[0]">Setup Tiers</div>
        </div>
        <div className="group-3 h-[46px] left-[28px] absolute top-[212px] w-[116px]">
            <div className="text-wrapper text-black font-normal text-[18px] leading-none absolute top-[0] left-[0]">Final Step</div>
            <div className="text-wrapper-2 text-[#00000080] font-normal text-[14px] leading-none absolute top-[27px] left-[0]">Describe Tier List</div>
        </div>
        <img
            className="line h-[1px] left-[16px] absolute top-[93px] w-[228px]"
            alt="Line"
            src="https://cdn.animaapp.com/projects/65dc6c88c695d9b9e2297b85/releases/65dc6d584d11273f918e4efd/img/line-1.svg"
        />
        <img
            className="img h-[1px] left-[16px] absolute top-[187px] w-[228px]"
            alt="Line"
            src="https://cdn.animaapp.com/projects/65dc6c88c695d9b9e2297b85/releases/65dc6d584d11273f918e4efd/img/line-1.svg"
        />
    </div>)
}
export default CreateNav;