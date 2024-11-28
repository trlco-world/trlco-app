import React from "react";

const TimelineItem: React.FC<{
  date: string;
  title: string;
  description: string;
  isActive?: boolean;
}> = ({ date, title, description, isActive }) => {
  return (
    <div className='relative py-6'>
      {/* Date */}
      <div
        className={`absolute left-0 top-0 ${isActive ? "text-red-500" : "text-gray-400"}`}
      >
        <div className={`flex items-center`}>
          <div
            className={`w-4 h-4 rounded-full border-4 ${isActive ? "border-red-500 bg-white" : "border-gray-300 bg-gray-200"}`}
          ></div>
          <div className='ml-4 text-sm text-gray-500 font-light'>{date}</div>
        </div>
      </div>

      {/* Line */}
      <div
        className={`absolute top-5 left-2 h-full border-l-2 ${isActive ? "border-dashed border-red-500" : "border-solid border-gray-300"}`}
      />

      {/* Title & Description */}
      <div className={`ml-8 pt-2`}>
        <h3
          className={`font-semibold ${isActive ? "text-black" : "text-gray-700"}`}
        >
          {title}
        </h3>
        <p className='text-gray-500 font-light'>{description}</p>
      </div>
    </div>
  );
};

const PropertyTimeline: React.FC = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-lg font-medium mb-2'>Funding timeline</h2>
        <p className='text-gray-600 mb-4'>
          The timeline is an estimate. Actual dates may vary.
        </p>
      </div>

      <div>
        <TimelineItem
          date='31 Aug 2024'
          title='Latest funding date'
          description='This is a conservative estimate for the closing date of the property funding.'
          isActive={true}
        />
        <TimelineItem
          date='14 Sep 2024'
          title='Ownership documents distributed'
          description='Your Property Share Certificates will be issued 2 weeks after the property is funded.'
        />
        <TimelineItem
          date='24 Sep 2024'
          title='Expected first rental payment'
          description='We project that the first rental payment will be paid by 31 September 2024, with a guaranteed payment date no later than 30 October 2024.'
        />
      </div>
    </div>
  );
};

export default PropertyTimeline;
