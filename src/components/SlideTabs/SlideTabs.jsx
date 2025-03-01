import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
export const HoverSlideTabs = () => {
  return (
    <SlideTabs />
  );
};

const SlideTabs = () => {
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
      className="fixed left-1/2 -translate-x-1/2 top-4  flex w-fit rounded-full border-[0.8px] z-10 bg-white/[0.08] border-white/[0.08] backdrop-blur-lg p-1 px-5"
    >
      <Tab setPosition={setPosition} href={"#"}>
        <div className="group">Home</div>
        </Tab>
      <Cursor position={position} />
      <Tab setPosition={setPosition} href="#about">
        <div className="group">About</div>
        </Tab>
      <Tab setPosition={setPosition} href="#projects">
        <div className="group">Projects</div>
        </Tab>
      <Tab setPosition={setPosition} href="#experience">
        <div className="group">Experience</div>
        </Tab>
      <Tab setPosition={setPosition} href="#contact">
        <div className="group">Contact</div>
        </Tab>

    </ul>
  );
};

const Tab = ({ children, setPosition, href }) => {
  const ref = useRef(null);

  return (
    <a
      href={href}
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
      className="relative z-10 block cursor-pointer px-1.5  py-1.5 text-xs text-center  text-white mix-blend-lighten md:px-4  md:py-3 md:text-base"
    >
      {children}
    </a>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-1 h-7 rounded-full  backdrop-blur md:h-12"
    />
  );
};