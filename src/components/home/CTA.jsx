import React from "react";

function CTA() {
  return (
    <section className="px-[124px] py-16">
      <div
        className="group bg-[#4640DE] text-white px-[6rem] py-[4rem] font-poppins relative rounded-md overflow-hidden"
        style={{
          clipPath:
            "polygon(12.5% 0%, 100% 0%, 100% 81.25%, 81.25% 100%, 0% 100%, 0% 12.5%)",
        }}
      >
        {/* Left content only */}
        <div className="max-w-md ">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Start posting <br /> jobs today
          </h2>
          <p className="mb-6">Start posting jobs for only $10.</p>
          <button className="bg-white text-[#4F46E5] font-semibold px-6 py-2 rounded-md shadow-md hover:bg-gray-100 transition">
            Sign Up For Free
          </button>
        </div>

        {/* Right image fixed at bottom-right */}
        <img
          src="/img/CTA.jpg"
          alt="CTA Visual"
          className="absolute bottom-0 right-[100px] w-[430px] h-auto object-contain 
    transition duration-300 ease-in-out group-hover:scale-110 hover:brightness-10 hover:shadow-xl"
        />
      </div>
    </section>
  );
}

export default CTA;
