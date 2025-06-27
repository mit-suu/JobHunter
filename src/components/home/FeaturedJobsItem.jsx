function FeaturedJobsItem({ job }) {
  const {
    logo,
    title,
    company,
    location,
    type,
    categories,
  } = job;

  return (
    <div className="bg-white border border-[#EDEDED] px-5 py-6 shadow-sm hover:shadow-xl transition min-w-[250px] h-full flex flex-col justify-between transform hover:-translate-y-1 duration-300">
      {/* Nội dung phía trên */}
      <div className="flex-1">
        {/* Header row */}
        <div className="flex justify-between items-start mb-4">
          <img src={logo} alt={company} className="w-10 h-10 object-contain" />
          <span className="text-xs font-medium border border-[#4640DE] px-7 py-[6px] text-[#4640DE] rounded-sm">
            {type}
          </span>
        </div>

        {/* Title & Company */}
        <h3 className="text-base font-semibold text-[#25324B] mb-1">{title}</h3>
        <p className="text-xs text-[#7C8493] mb-4">{company} · {location}</p>
      </div>

      {/* Categories ở đáy */}
      <div className="flex gap-2 flex-wrap mt-4">
        {categories.map((cat, index) => (
          <span
            key={index}
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              index % 2 === 0
                ? 'bg-[rgba(255,184,54,0.1)] text-[#FFB836]'
                : 'bg-[rgba(86,205,173,0.1)] text-[#56CDAD]'
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
