function FeaturedJobsItem({ job }) {
  const { logo, title, company, location, type, categories } = job;

  return (
    <div className="flex h-full min-w-[250px] transform flex-col justify-between border border-[#EDEDED] bg-white px-5 py-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl rounded-lg">
      {/* Nội dung phía trên */}
      <div className="flex-1">
        {/* Header row */}
        <div className="mb-4 flex items-start justify-between">
          <img src={logo} alt={company} className="h-10 w-10 object-contain" />
          <span className="rounded-md border border-[#4640DE] px-7 py-[6px] text-xs font-medium text-[#4640DE]">
            {type}
          </span>
        </div>

        {/* Title & Company */}
        <h3 className="mb-1 text-base font-semibold text-[#25324B]">{title}</h3>
        <p className="mb-4 text-xs text-[#7C8493]">
          {company} · {location}
        </p>
      </div>

      {/* Categories ở đáy */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((cat, index) => (
          <span
            key={index}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              index % 2 === 0
                ? "bg-[rgba(255,184,54,0.1)] text-[#FFB836]"
                : "bg-[rgba(86,205,173,0.1)] text-[#56CDAD]"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}

export default FeaturedJobsItem;
