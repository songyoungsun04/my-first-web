"use client";

import { useEffect, useState, useMemo } from "react";

type MoleColor = "blue" | "red" | "green" | "purple";
type FocusField = "email" | "password" | "name" | null;

interface MoleCharacterProps {
  color?: MoleColor;
  focusField?: FocusField;
  size?: number;
}

const COLOR_MAP: Record<MoleColor, { body: string; bodyDark: string; belly: string; nose: string; cheek: string }> = {
  blue: {
    body: "#4A90D9",
    bodyDark: "#3A72B0",
    belly: "#A8D0F5",
    nose: "#F5A0B8",
    cheek: "#F5C0D0",
  },
  red: {
    body: "#E05A5A",
    bodyDark: "#C04040",
    belly: "#F5B8B8",
    nose: "#F5A0B8",
    cheek: "#F5D0C0",
  },
  green: {
    body: "#5ABF7A",
    bodyDark: "#40A060",
    belly: "#B8F5C8",
    nose: "#F5A0B8",
    cheek: "#F5D8C0",
  },
  purple: {
    body: "#8A6ABF",
    bodyDark: "#6A4A9F",
    belly: "#D0B8F5",
    nose: "#F5A0B8",
    cheek: "#F5C8D8",
  },
};

export default function MoleCharacter({
  color = "blue",
  focusField = null,
  size = 200,
}: MoleCharacterProps) {
  const colors = COLOR_MAP[color];
  const [isBlinking, setIsBlinking] = useState(false);
  const [breathOffset, setBreathOffset] = useState(0);
  const [handRaise, setHandRaise] = useState(0);
  const [bodyWiggle, setBodyWiggle] = useState(0);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Breathing animation
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      setBreathOffset(Math.sin(elapsed / 800) * 2);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Body wiggle animation (idle sway)
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      setBodyWiggle(Math.sin(elapsed / 1200) * 1.5);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Hand raise for password
  useEffect(() => {
    if (focusField === "password") {
      const timer = setTimeout(() => setHandRaise(1), 50);
      return () => clearTimeout(timer);
    } else {
      setHandRaise(0);
    }
  }, [focusField]);

  // Eye direction based on focus
  const eyeOffset = useMemo(() => {
    switch (focusField) {
      case "email":
        return { x: 4, y: 2 };
      case "name":
        return { x: 3, y: -1 };
      case "password":
        return { x: 0, y: 3 };
      default:
        return { x: 0, y: 0 };
    }
  }, [focusField]);

  const viewBox = "0 0 200 220";
  const eyeHeight = isBlinking ? 1 : 10;
  const eyeRy = isBlinking ? 0.5 : 5;

  const leftHandY = handRaise === 1 ? 68 : 115;
  const rightHandY = handRaise === 1 ? 68 : 115;
  const handTransition = "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";

  return (
    <div
      style={{
        width: size,
        height: size * 1.1,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox={viewBox}
        width={size}
        height={size * 1.1}
        style={{
          overflow: "visible",
          transform: `rotate(${bodyWiggle}deg)`,
          transformOrigin: "center bottom",
          transition: "transform 0.1s ease",
        }}
      >
        {/* Shadow */}
        <ellipse cx="100" cy="210" rx="55" ry="8" fill="rgba(0,0,0,0.08)" />

        {/* Body */}
        <g style={{ transform: `translateY(${breathOffset}px)` }}>
          {/* Main body shape */}
          <ellipse cx="100" cy="120" rx="60" ry="72" fill={colors.body} />
          
          {/* Belly */}
          <ellipse cx="100" cy="135" rx="40" ry="48" fill={colors.belly} opacity="0.6" />

          {/* Ears */}
          <circle cx="55" cy="62" r="18" fill={colors.body} />
          <circle cx="55" cy="62" r="11" fill={colors.belly} opacity="0.5" />
          <circle cx="145" cy="62" r="18" fill={colors.body} />
          <circle cx="145" cy="62" r="11" fill={colors.belly} opacity="0.5" />

          {/* Face area */}
          {/* Left eye white */}
          <ellipse cx="78" cy="90" rx="14" ry="12" fill="white" />
          {/* Right eye white */}
          <ellipse cx="122" cy="90" rx="14" ry="12" fill="white" />

          {/* Left pupil */}
          <ellipse
            cx={78 + eyeOffset.x}
            cy={90 + eyeOffset.y}
            rx="6"
            ry={eyeRy}
            fill="#2D2D2D"
            style={{ transition: "all 0.3s ease" }}
          />
          {/* Left eye highlight */}
          {!isBlinking && (
            <circle
              cx={75 + eyeOffset.x}
              cy={87 + eyeOffset.y}
              r="2.5"
              fill="white"
              style={{ transition: "all 0.3s ease" }}
            />
          )}

          {/* Right pupil */}
          <ellipse
            cx={122 + eyeOffset.x}
            cy={90 + eyeOffset.y}
            rx="6"
            ry={eyeRy}
            fill="#2D2D2D"
            style={{ transition: "all 0.3s ease" }}
          />
          {/* Right eye highlight */}
          {!isBlinking && (
            <circle
              cx={119 + eyeOffset.x}
              cy={87 + eyeOffset.y}
              r="2.5"
              fill="white"
              style={{ transition: "all 0.3s ease" }}
            />
          )}

          {/* Nose */}
          <ellipse cx="100" cy="103" rx="7" ry="5" fill={colors.nose} />
          {/* Nose highlight */}
          <ellipse cx="98" cy="101" rx="2.5" ry="1.5" fill="white" opacity="0.5" />

          {/* Mouth */}
          <path
            d="M 92 110 Q 100 117 108 110"
            fill="none"
            stroke={colors.bodyDark}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Cheeks */}
          <ellipse cx="65" cy="105" rx="10" ry="6" fill={colors.cheek} opacity="0.5" />
          <ellipse cx="135" cy="105" rx="10" ry="6" fill={colors.cheek} opacity="0.5" />

          {/* Whiskers */}
          <line x1="45" y1="95" x2="68" y2="100" stroke={colors.bodyDark} strokeWidth="1" opacity="0.3" />
          <line x1="45" y1="105" x2="68" y2="105" stroke={colors.bodyDark} strokeWidth="1" opacity="0.3" />
          <line x1="132" y1="100" x2="155" y2="95" stroke={colors.bodyDark} strokeWidth="1" opacity="0.3" />
          <line x1="132" y1="105" x2="155" y2="105" stroke={colors.bodyDark} strokeWidth="1" opacity="0.3" />

          {/* Feet */}
          <ellipse cx="78" cy="188" rx="18" ry="8" fill={colors.bodyDark} />
          <ellipse cx="122" cy="188" rx="18" ry="8" fill={colors.bodyDark} />

          {/* Left hand/arm */}
          <g style={{ transition: handTransition, transform: `translateY(${leftHandY - 115}px)` }}>
            <ellipse cx="48" cy="115" rx="14" ry="12" fill={colors.body} />
            {/* Paw pads */}
            <circle cx="44" cy="112" r="3" fill={colors.belly} opacity="0.5" />
            <circle cx="52" cy="112" r="3" fill={colors.belly} opacity="0.5" />
            <circle cx="48" cy="117" r="3.5" fill={colors.belly} opacity="0.5" />
          </g>

          {/* Right hand/arm */}
          <g style={{ transition: handTransition, transform: `translateY(${rightHandY - 115}px)` }}>
            <ellipse cx="152" cy="115" rx="14" ry="12" fill={colors.body} />
            {/* Paw pads */}
            <circle cx="148" cy="112" r="3" fill={colors.belly} opacity="0.5" />
            <circle cx="156" cy="112" r="3" fill={colors.belly} opacity="0.5" />
            <circle cx="152" cy="117" r="3.5" fill={colors.belly} opacity="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
