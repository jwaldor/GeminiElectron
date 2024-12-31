import React from "react";

interface LogoProps {
  className?: string;
}

const PipecatLogo: React.FC<LogoProps> = ({ className }) => (
  <svg
    width="332"
    height="192"
    viewBox="0 0 332 192"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M45.7718 0.769635C50.4477 -0.990844 55.7252 0.330188 59.0204 4.08595L101.936 53H230.064L272.98 4.08595C276.275 0.330188 281.552 -0.990844 286.228 0.769635C290.904 2.53011 294 7.00367 294 12V120H332V144H270V43.8728L244.52 72.9141C242.242 75.5111 238.955 77 235.5 77H96.5C93.0452 77 89.7581 75.5111 87.4796 72.9141L62 43.8728V144H0V120H38V12C38 7.00367 41.0958 2.53011 45.7718 0.769635Z"
      fill="currentColor"
    />
    <path d="M270 168H332V192H270V168Z" fill="currentColor" />
    <path d="M0 168H62V192H0V168Z" fill="currentColor" />
    <path
      d="M128 128C128 136.837 120.837 144 112 144C103.163 144 96 136.837 96 128C96 119.164 103.163 112 112 112C120.837 112 128 119.164 128 128Z"
      fill="currentColor"
    />
    <path
      d="M236 128C236 136.837 228.837 144 220 144C211.163 144 204 136.837 204 128C204 119.164 211.163 112 220 112C228.837 112 236 119.164 236 128Z"
      fill="currentColor"
    />
  </svg>
);

export default PipecatLogo;
