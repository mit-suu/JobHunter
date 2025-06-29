import React from "react";

function CTA() {
  return (
    <section className="px-[124px] py-16">
      <div
        className="group relative overflow-hidden rounded-md bg-[#4640DE] px-[6rem] py-[4rem] font-poppins text-white"
        style={{
          clipPath:
            "polygon(12.5% 0%, 100% 0%, 100% 81.25%, 81.25% 100%, 0% 100%, 0% 12.5%)",
        }}
      >
        {/* Left content only */}
        <div className="max-w-md">
          <h2 className="mb-4 text-4xl font-bold leading-tight">
            Start posting <br /> jobs today
          </h2>
          <p className="mb-6">Start posting jobs for only $10.</p>
          <button className="rounded-md bg-white px-6 py-2 font-semibold text-[#4F46E5] shadow-md transition hover:bg-gray-100">
            Sign Up For Free
          </button>
        </div>

        {/* Right image fixed at bottom-right */}
        <img
          src="/img/CTA.jpg"
          alt="CTA Visual"
          className="hover:brightness-10 absolute bottom-0 right-[100px] h-auto w-[430px] object-contain transition duration-300 ease-in-out hover:shadow-xl group-hover:scale-110"
        />
      </div>
    </section>
  );
}

export default CTA;
