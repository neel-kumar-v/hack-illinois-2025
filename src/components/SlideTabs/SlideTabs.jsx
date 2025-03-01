import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
export const DateRangeSlideTabs = ({ viewOptions, onclick }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="flex gap-x-2"
    >
      <Cursor position={position} />
      {viewOptions.map(({ id, label }) => (
        <SlideTab
          key={id}
          setPosition={setPosition}
          onclick={() => onclick(id)}
          label={label}
        />
      ))}
    </ul>
  );
};
export const DateNavigatorSlideTabs = ({ navOptions }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="flex justify-center items-center gap-4"
    >
      <Cursor position={position} />
      {navOptions.map(({ id, onclick, children }) => (
        <SlideTab
          key={id}
          setPosition={setPosition}
          onclick={onclick}
          label={children}
        />
      ))}
    </ul>
  );
};

const SlideTab = ({ onclick, label, setPosition }) => {
  return (
      <Tab setPosition={setPosition}  onclick={onclick}>
        {label}
      </Tab>
  );
};

const Tab = ({ children, setPosition, onclick }) => {
  const ref = useRef(null);

  return (
    <button
      onClick={onclick}
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer p-1 text-xs text-center  text-black md:px-2  md:py-1.5 md:text-base"
    >
      {children}
    </button>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-1 h-7 rounded-md bg-black/10  backdrop-blur md:h-[2.125rem]"
    />
  );
};