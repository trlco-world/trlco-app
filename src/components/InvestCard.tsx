const data = {
  valuation: '3,000,000 USD',
  roi: '15%',
  tokenPrice: '50 USD',
  tokenAvailable: '60000',
  tokenUnavailable: '40000',
  userInvested: '25',
}

export default function InvestCard() {
  return (
    <div className='rounded-3xl overflow-clip bg-[radial-gradient(309.36%_167.4%_at_173.5%_96.42%,_#F36C24_0%,_#E96E2A_1.85%,_#D67536_4.93%,_#B67C4A_8.85%,_#868463_13.47%,_#288B7F_18.63%,_#088B82_19.12%,_#088AB5_28.13%,_#3189AF_30.43%,_#5D879F_34.24%,_#898384_39.11%,_#B97C60_44.84%,_#EF6D28_51.23%,_#F36C24_51.51%,_#EF3F36_76.99%,_#088B82_99.44%)] bg-clip-border border h-[500px] border-transparent'>
      <div className='p-6 bg-[radial-gradient(309.36%_167.4%_at_173.5%_96.42%,_#F36C24_0%,_#E96E2A_1.85%,_#D67536_4.93%,_#B67C4A_8.85%,_#868463_13.47%,_#288B7F_18.63%,_#088B82_19.12%,_#088AB5_28.13%,_#3189AF_30.43%,_#5D879F_34.24%,_#898384_39.11%,_#B97C60_44.84%,_#EF6D28_51.23%,_#F36C24_51.51%,_#EF3F36_76.99%,_#088B82_99.44%)]'>
        <div className='flex flex-col text-white'>
          <span className='text-sm font-light'>Current Valuation</span>
          <span className='text-2xl font-medium'>{data.valuation}</span>
        </div>
      </div>
      <div className='w-full h-full bg-white'></div>
    </div>
  )
}
