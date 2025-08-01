import React from "react";
import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();
  return (
    <section className="px-4 sm:px-6 lg:px-[124px] py-16">
      <div
        className="group relative overflow-hidden rounded-md bg-[#4640DE] px-8 sm:px-12 lg:px-[6rem] py-16 font-poppins text-white"
        style={{
          clipPath:
            "polygon(12.5% 0%, 100% 0%, 100% 81.25%, 81.25% 100%, 0% 100%, 0% 12.5%)",
        }}
      >
        {/* Left content only */}
        <div className="max-w-md">
          <h2 className="mb-4 text-4xl font-bold leading-tight">
            Start searching <br /> jobs today
          </h2>
          <p className="mb-6">Start searching jobs by any company.</p>
          <button
            onClick={() => navigate("/companies")}
            className="rounded-md bg-white px-6 py-2 font-semibold text-[#4F46E5] shadow-md transition hover:bg-gray-100">
            List all companies
          </button>
        </div>

        {/* Right image fixed at bottom-right */}
        <img
          src="/img/CTA.jpg"
          alt="CTA Visual"
          className="absolute bottom-0 right-4 sm:right-12 lg:right-[100px] w-[250px] sm:w-[300px] lg:w-[430px] max-w-[80%] object-contain transition duration-300 ease-in-out hover:shadow-xl group-hover:scale-110"
        />
      </div>
    </section>
  );
}

export default CTA;
