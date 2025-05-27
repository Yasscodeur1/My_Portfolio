// import LocomotiveScroll from 'locomotive-scroll';
// import './styles/locomotive-scroll.css';
// import DirectionBlock from '@/components/sections/DirectionBlock';

 // useEffect(() => {
    //     const scroll = new LocomotiveScroll({
    //     el: containerRef.current!,
    //     smooth: true,
    //     });

    //     return () => {
    //     scroll.destroy();
    //     };
    // }, []);

    

// const scrollItems = [
//   {
//     text: "I'm moving in this direction",
//     speed: 6,
//     // className:
//     //   "rotate-[30deg] [clip-path:polygon(0_0,100%_0,70%_100%,0_100%)]",
//   },
//   {
//     text: "And in this direction",
//     speed: -8,
//     className:
//       "-rotate-[30deg] ",
//   },
//   {
//     text: "Sooo customizable. Right?",
//     speed: 9,
//     delay: 0.5,
//     className:
//       "rotate-[25deg] ",
//   },
//   {
//     text: "I can also go in this direction",
//     speed: 15,
//     className:
//       "-rotate-[15deg] ",
//   },
// ];

// export default function DirectionBlock() {
//   return (
//     <div className="relative w-full overflow-hidden py-20" id="direction">
//         <div  className="mb-10 h-[32rem] overflow-hidden">
//       {scrollItems.map((item, index) => (
//           <span
//             key={index}
//             className={`absolute left-3/5 top-1/2 block text-black bg-white -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-9xl font-bold  ${item.className}`}
//             data-scroll
//             data-scroll-direction="horizontal"
//             data-scroll-speed={item.speed}
//             data-scroll-target="#direction"
//             data-scroll-delay={item.delay || null}
//             // style={{ top: `calc(50% + ${index * 3}rem)` }} // décale chaque texte vers le bas
//             style={{ top: `calc(50% + ${(index % 2 === 0 ? 1 : -1) * index * 2}rem)` }}

//           >
//             {item.text}
//           </span>
//       ))}
//       </div>
//     </div>
//   );
// }

