export const PropertyDetailBadge = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => (
  <span className='py-1 px-3 flex gap-2 items-center bg-neutral-100 text-neutral-600 font-light rounded-full'>
    <span className='*:w-5 *:h-5'>{icon}</span>
    {value}
  </span>
);
