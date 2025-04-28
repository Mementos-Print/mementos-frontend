// const LoadingSkeleton = () => {
//     return (
//       <div className="relative h-[70px] overflow-hidden">
//         <div 
//           className="animate-shimmer absolute inset-0 bg-black"
//           style={{
//             background: 'linear-gradient(to right, #eeeeee 8%, #bbbbbb 18%, #eeeeee 33%)',
//             backgroundSize: '800px 104px',
//           }}
//         />
//         <div className="absolute top-0 left-[25%] h-full w-[5%] bg-white" />
//       </div>
//     );
//   };

const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse rounded-lg bg-gray-300 h-40 w-full" />
    );
};

export default LoadingSkeleton