import React from 'react';
import { ImagePlus } from 'lucide-react';
import defaultDavinaPhoto from '../assets/davina_couple_photo.jpg';

/**
 * Shared SVG defs for soft watercolor paper grain & hand-drawn feel
 */
function SharedSvgDefs() {
  return (
    <defs>
      <filter id="watercolor-soft" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="noise" />
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.055 0"
          in="noise"
          result="coloredNoise"
        />
        <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
        <feBlend mode="multiply" in="SourceGraphic" in2="texture" />
      </filter>
    </defs>
  );
}

/**
 * Pastel blue & cream checkered background used in Slides 1, 4, 7
 */
function CheckeredCardBg() {
  const squares = [];
  const count = 9;
  const size = 400 / count;
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      const isBlue = (r + c) % 2 === 0;
      squares.push(
        <rect
          key={`${r}-${c}`}
          x={c * size}
          y={r * size}
          width={size + 0.6}
          height={size + 0.6}
          fill={isBlue ? '#c5dff4' : '#fcfaf3'}
        />
      );
    }
  }
  return (
    <g filter="url(#watercolor-soft)">
      <rect width="400" height="400" fill="#fcfaf3" />
      {squares}
      <rect
        x="0"
        y="0"
        width="400"
        height="400"
        fill="none"
        stroke="#a7caec"
        strokeWidth="6"
        opacity="0.45"
      />
    </g>
  );
}

/**
 * Vertical pastel blue & cream striped wallpaper background used in Slides 2, 3, 6
 */
function StripedCardBg() {
  const stripes = [];
  const pitch = 44;
  for (let x = 0; x <= 400; x += pitch) {
    stripes.push(
      <g key={x}>
        <rect x={x} y="0" width="30" height="400" fill="#fdfaf0" />
        <rect x={x + 30} y="0" width="14" height="400" fill="#c7e1f6" />
        <line
          x1={x + 30}
          y1="0"
          x2={x + 30}
          y2="400"
          stroke="#a6c9e8"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1={x + 44}
          y1="0"
          x2={x + 44}
          y2="400"
          stroke="#a6c9e8"
          strokeWidth="1.5"
          opacity="0.7"
        />
      </g>
    );
  }
  return (
    <g filter="url(#watercolor-soft)">
      <rect width="400" height="400" fill="#fdfaf0" />
      {stripes}
      <rect
        x="0"
        y="0"
        width="400"
        height="400"
        fill="none"
        stroke="#9dc3e6"
        strokeWidth="6"
        opacity="0.45"
      />
    </g>
  );
}

/**
 * Cute Grey-and-White Tabby Kitten peeking over a ledge
 */
interface PeekingKittenProps {
  x: number;
  y: number;
  scale?: number;
  withHat?: boolean;
  hatTilt?: number;
  eyes?: 'dot' | 'squint';
  showWhiskerTicks?: boolean;
}

function PeekingKitten({
  x,
  y,
  scale = 1,
  withHat = false,
  hatTilt = 0,
  eyes = 'dot',
  showWhiskerTicks = false,
}: PeekingKittenProps) {
  const headClipId = `kitten-head-clip-${x}-${y}`;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <defs>
        <clipPath id={headClipId}>
          <path d="M -68,38 C -73,2 -58,-40 0,-40 C 58,-40 73,2 68,38 Z" />
        </clipPath>
      </defs>

      {/* Party Hat */}
      {withHat && (
        <g transform={`translate(0, -36) rotate(${hatTilt})`}>
          <path
            d="M -23,4 L 0,-50 L 23,4 Z"
            fill="#b5d8f4"
            stroke="#1f1b1c"
            strokeWidth="3.6"
            strokeLinejoin="round"
          />
          <circle cx="-4" cy="-24" r="3.5" fill="#ffffff" opacity="0.9" />
          <circle cx="7" cy="-14" r="3.8" fill="#ffffff" opacity="0.9" />
          <circle cx="-9" cy="-8" r="4" fill="#ffffff" opacity="0.9" />
          <circle cx="3" cy="-3" r="3.2" fill="#ffffff" opacity="0.9" />
          <path
            d="M 0,-61 C 4,-63 8,-60 8,-56 C 12,-54 11,-48 7,-46 C 8,-42 3,-40 0,-42 C -3,-40 -8,-42 -7,-46 C -11,-48 -12,-54 -8,-56 C -8,-60 -4,-63 0,-61 Z"
            fill="#fcfaf5"
            stroke="#1f1b1c"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Left Ear */}
      <path
        d="M -57,-14 C -61,-36 -56,-56 -47,-61 C -38,-59 -27,-45 -21,-35 Z"
        fill="#a8a39d"
        stroke="#1f1b1c"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      <path d="M -51,-22 C -53,-36 -50,-48 -45,-52 C -39,-49 -32,-40 -28,-33 Z" fill="#f5cbc5" />

      {/* Right Ear */}
      <path
        d="M 57,-14 C 61,-36 56,-56 47,-61 C 38,-59 27,-45 21,-35 Z"
        fill="#a8a39d"
        stroke="#1f1b1c"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      <path d="M 51,-22 C 53,-36 50,-48 45,-52 C 39,-49 32,-40 28,-33 Z" fill="#f5cbc5" />

      {/* Clipped Head Fill & Markings */}
      <g clipPath={`url(#${headClipId})`}>
        <rect x="-80" y="-50" width="160" height="100" fill="#a8a39d" />
        <path d="M 0,-18 C -14,0 -36,24 -56,42 L 56,42 C 36,24 14,0 0,-18 Z" fill="#ffffff" />
        <path
          d="M -13,-42 L -11,-21 M 0,-43 L 0,-23 M 13,-42 L 11,-21"
          stroke="#6b6660"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <path
          d="M -72,-2 L -51,2 M -72,11 L -53,13"
          stroke="#6b6660"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 72,-2 L 51,2 M 72,11 L 53,13"
          stroke="#6b6660"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* Head Outline */}
      <path
        d="M -66,35 C -71,4 -62,-14 -56,-20 M -23,-36 C -10,-40 10,-40 23,-36 M 56,-20 C 62,-14 71,4 66,35"
        fill="none"
        stroke="#1f1b1c"
        strokeWidth="3.8"
        strokeLinecap="round"
      />

      {/* Blush Cheeks */}
      <ellipse cx="-34" cy="20" rx="10.5" ry="6" fill="#f5b3a9" opacity="0.85" />
      <ellipse cx="34" cy="20" rx="10.5" ry="6" fill="#f5b3a9" opacity="0.85" />

      {/* Eyes */}
      {eyes === 'dot' ? (
        <g>
          <circle cx="-25" cy="10" r="5.4" fill="#1f1b1c" />
          <circle cx="-26.5" cy="8.2" r="1.6" fill="#ffffff" />
          <circle cx="25" cy="10" r="5.4" fill="#1f1b1c" />
          <circle cx="23.5" cy="8.2" r="1.6" fill="#ffffff" />
        </g>
      ) : (
        <g stroke="#1f1b1c" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M -31,4 L -20,10 L -31,15" />
          <path d="M 31,4 L 20,10 L 31,15" />
        </g>
      )}

      {/* Cute Nose & :3 Mouth */}
      <ellipse cx="0" cy="13" rx="3" ry="2" fill="#e5989b" />
      <path
        d="M -7.5,16.5 Q -3.8,22 0,16 Q 3.8,22 7.5,16.5"
        fill="none"
        stroke="#1f1b1c"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Side Whisker / Excitement Ticks */}
      {showWhiskerTicks && (
        <g stroke="#183148" strokeWidth="3.5" strokeLinecap="round">
          <line x1="-88" y1="6" x2="-78" y2="9" />
          <line x1="-89" y1="20" x2="-79" y2="20" />
          <line x1="88" y1="6" x2="78" y2="9" />
          <line x1="89" y1="20" x2="79" y2="20" />
        </g>
      )}

      {/* Left Front Paw */}
      <g transform="translate(-35, 34)">
        <ellipse
          cx="0"
          cy="0"
          rx="20"
          ry="12.5"
          fill="#ffffff"
          stroke="#1f1b1c"
          strokeWidth="3.6"
        />
        <path
          d="M -6,3 L -6,11 M 6,3 L 6,11"
          stroke="#1f1b1c"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </g>

      {/* Right Front Paw */}
      <g transform="translate(35, 34)">
        <ellipse
          cx="0"
          cy="0"
          rx="20"
          ry="12.5"
          fill="#ffffff"
          stroke="#1f1b1c"
          strokeWidth="3.6"
        />
        <path
          d="M -6,3 L -6,11 M 6,3 L 6,11"
          stroke="#1f1b1c"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

function HeartIcon({
  x,
  y,
  scale = 1,
  rotate = 0,
  fill = '#163252',
  outlined = false,
}: {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  fill?: string;
  outlined?: boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M 0,6 C -2,2 -9,-2 -9,-7 C -9,-11 -5,-13 -2,-10 C -0.5,-8.5 0,-7 0,-7 C 0,-7 0.5,-8.5 2,-10 C 5,-13 9,-11 9,-7 C 9,-2 2,2 0,6 Z"
        fill={outlined ? 'none' : fill}
        stroke="#163252"
        strokeWidth={outlined ? '3.2' : '1.5'}
        strokeLinejoin="round"
      />
    </g>
  );
}

function BowIcon({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      fill="none"
      stroke="#163252"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 0,0 C -10,-10 -22,-8 -22,0 C -22,8 -10,8 0,0 Z" />
      <path d="M 0,0 C 10,-10 22,-8 22,0 C 22,8 10,8 0,0 Z" />
      <path d="M -2,2 L -15,14" />
      <path d="M 2,2 L 15,14" />
    </g>
  );
}

/**
 * SLIDE 1: "HAPPY BIRTHDAY DAVINA"
 */
export function Slide1Birthday({ customSlideImg }: { customSlideImg?: string }) {
  if (customSlideImg) {
    return (
      <img
        src={customSlideImg}
        alt="Happy Birthday Davina"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover block select-none"
      />
    );
  }

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full block select-none">
      <SharedSvgDefs />
      <CheckeredCardBg />

      <g transform="translate(200, 195)">
        <path
          d="
            M -148,0
            C -158,-25 -142,-52 -120,-56
            C -126,-80 -105,-105 -80,-102
            C -74,-128 -42,-142 -16,-130
            C 0,-148 32,-146 46,-128
            C 72,-138 104,-122 104,-96
            C 130,-96 148,-70 138,-44
            C 158,-26 158,10 138,28
            C 148,54 128,82 102,82
            C 92,102 65,108 42,102
            L -42,102
            C -65,108 -92,102 -102,82
            C -128,82 -148,54 -138,28
            C -154,16 -154,-8 -148,0 Z
          "
          fill="#fdfaf1"
          stroke="#7594b3"
          strokeWidth="2.2"
        />
        <path
          d="
            M -137,0
            C -146,-22 -131,-46 -111,-50
            C -116,-72 -97,-95 -74,-92
            C -68,-116 -39,-129 -15,-118
            C 0,-135 29,-133 42,-116
            C 66,-125 95,-111 95,-87
            C 119,-87 136,-63 127,-39
            C 145,-23 145,9 127,25
            C 136,49 118,74 94,74
            C 85,92 60,97 38,92
            L -38,92
            C -60,97 -85,92 -94,74
            C -118,74 -136,49 -127,25
            C -142,14 -142,-7 -137,0 Z
          "
          fill="none"
          stroke="#6a88a7"
          strokeWidth="1.8"
          strokeDasharray="6 6"
        />
      </g>

      <defs>
        <path id="s1-line1" d="M 95,128 Q 200,104 305,128" />
        <path id="s1-line2" d="M 90,162 Q 200,140 310,162" />
        <path id="s1-line3" d="M 105,195 Q 200,176 295,195" />
      </defs>

      <text
        fill="#163252"
        className="font-kawaii"
        fontSize="37"
        fontWeight="700"
        letterSpacing="2"
        textAnchor="middle"
      >
        <textPath href="#s1-line1" startOffset="50%">
          HAPPY
        </textPath>
      </text>
      <text
        fill="#163252"
        className="font-kawaii"
        fontSize="29"
        fontWeight="700"
        letterSpacing="1.5"
        textAnchor="middle"
      >
        <textPath href="#s1-line2" startOffset="50%">
          BIRTHDAY
        </textPath>
      </text>
      <text
        fill="#163252"
        className="font-kawaii"
        fontSize="29"
        fontWeight="700"
        letterSpacing="2"
        textAnchor="middle"
      >
        <textPath href="#s1-line3" startOffset="50%">
          DAVINA
        </textPath>
      </text>

      <HeartIcon x={109} y={145} scale={0.95} rotate={-15} />
      <HeartIcon x={294} y={142} scale={0.95} rotate={15} />
      <HeartIcon x={111} y={224} scale={0.95} rotate={-12} />
      <HeartIcon x={291} y={227} scale={0.95} rotate={12} />

      <line
        x1="126"
        y1="296"
        x2="274"
        y2="296"
        stroke="#1f1b1c"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <PeekingKitten
        x={200}
        y={258}
        scale={0.84}
        withHat={true}
        hatTilt={0}
        eyes="dot"
        showWhiskerTicks={true}
      />

      <line
        x1="133"
        y1="328"
        x2="165"
        y2="328"
        stroke="#2c4c6e"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <BowIcon x={200} y={326} scale={0.82} />
      <line
        x1="235"
        y1="328"
        x2="267"
        y2="328"
        stroke="#2c4c6e"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * SLIDE 2: "CONTINUE"
 */
export function Slide2Continue({
  onContinue,
  customSlideImg,
}: {
  onContinue?: () => void;
  customSlideImg?: string;
}) {
  if (customSlideImg) {
    return (
      <img
        src={customSlideImg}
        alt="Continue"
        onClick={onContinue}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover block select-none cursor-pointer"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full block select-none cursor-pointer"
      onClick={onContinue}
    >
      <SharedSvgDefs />
      <StripedCardBg />

      <HeartIcon x={96} y={145} scale={0.95} rotate={-15} outlined={true} />
      <line
        x1="74"
        y1="166"
        x2="88"
        y2="171"
        stroke="#163252"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <HeartIcon x={305} y={148} scale={0.95} rotate={18} outlined={true} />

      <g transform="translate(200, 248)">
        <rect
          x="-128"
          y="-48"
          width="256"
          height="96"
          rx="48"
          fill="#badbf5"
          stroke="#1f1b1c"
          strokeWidth="3.8"
        />
        <rect
          x="-117"
          y="-37"
          width="234"
          height="74"
          rx="37"
          fill="none"
          stroke="#eef7fd"
          strokeWidth="2.4"
          strokeDasharray="8 7"
        />
        <text
          x="0"
          y="11"
          fill="#163252"
          className="font-kawaii"
          fontSize="31"
          fontWeight="700"
          letterSpacing="2.5"
          textAnchor="middle"
        >
          CONTINUE
        </text>
      </g>

      <PeekingKitten x={188} y={160} scale={0.98} withHat={false} eyes="dot" />

      <g stroke="#163252" strokeWidth="3.8" strokeLinecap="round">
        <line x1="48" y1="223" x2="58" y2="230" />
        <line x1="40" y1="248" x2="53" y2="248" />
        <line x1="48" y1="275" x2="58" y2="268" />
        <line x1="348" y1="220" x2="337" y2="228" />
        <line x1="356" y1="245" x2="342" y2="246" />
        <line x1="350" y1="270" x2="338" y2="264" />
      </g>

      <BowIcon x={196} y={325} scale={1} />
    </svg>
  );
}

/**
 * SLIDE 3: "MAKE A WISH DULU DONG"
 */
export function Slide3MakeAWish({ customSlideImg }: { customSlideImg?: string }) {
  if (customSlideImg) {
    return (
      <img
        src={customSlideImg}
        alt="Make a wish dulu dong"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover block select-none"
      />
    );
  }

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full block select-none">
      <SharedSvgDefs />
      <StripedCardBg />

      <defs>
        <path id="s3-arch1" d="M 48,88 Q 200,12 352,88" />
        <path id="s3-arch2" d="M 76,120 Q 200,56 324,120" />
      </defs>

      <text
        fill="#163252"
        className="font-kawaii"
        fontSize="37"
        fontWeight="700"
        letterSpacing="2"
        textAnchor="middle"
      >
        <textPath href="#s3-arch1" startOffset="50%">
          MAKE A WISH
        </textPath>
      </text>
      <text
        fill="#163252"
        className="font-kawaii"
        fontSize="35"
        fontWeight="700"
        letterSpacing="2"
        textAnchor="middle"
      >
        <textPath href="#s3-arch2" startOffset="50%">
          DULU DONG
        </textPath>
      </text>

      <HeartIcon x={66} y={78} scale={1.05} rotate={-25} />
      <HeartIcon x={333} y={78} scale={1.05} rotate={25} />

      <g transform="translate(200, 222)">
        <ellipse
          cx="0"
          cy="28"
          rx="84"
          ry="26"
          fill="#ffffff"
          stroke="#1f1b1c"
          strokeWidth="3.8"
        />
        <ellipse
          cx="0"
          cy="28"
          rx="67"
          ry="18"
          fill="#c4dff6"
          stroke="#1f1b1c"
          strokeWidth="2.6"
        />

        <path
          d="M -60,-22 L -60,20 C -60,34 60,34 60,20 L 60,-22 Z"
          fill="#fdfaf2"
          stroke="#1f1b1c"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        <path
          d="M -58,2 C -20,12 20,12 58,2"
          fill="none"
          stroke="#f6ead4"
          strokeWidth="10"
        />
        <circle cx="-35" cy="5" r="1.8" fill="#5c5346" />
        <circle cx="2" cy="8" r="1.8" fill="#5c5346" />
        <circle cx="32" cy="5" r="1.8" fill="#5c5346" />

        <path
          d="
            M -62,-24
            C -62,-44 62,-44 62,-24
            C 62,-12 56,-4 48,-4
            C 40,-4 38,-15 30,-15
            C 22,-15 18,-2 8,-2
            C -2,-2 -6,-15 -15,-15
            C -24,-15 -28,-2 -38,-2
            C -48,-2 -50,-14 -56,-14
            C -60,-14 -62,-18 -62,-24 Z
          "
          fill="#b5d8f4"
          stroke="#1f1b1c"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        <circle cx="-36" cy="-24" r="2" fill="#2c4c6e" />
        <circle cx="-14" cy="-20" r="2" fill="#2c4c6e" />
        <circle cx="15" cy="-20" r="2" fill="#2c4c6e" />
        <circle cx="38" cy="-25" r="2" fill="#2c4c6e" />

        <rect
          x="-6.5"
          y="-82"
          width="13"
          height="36"
          rx="3"
          fill="#fdfaf2"
          stroke="#1f1b1c"
          strokeWidth="3.6"
        />
        <line x1="-5" y1="-68" x2="5" y2="-73" stroke="#b5d8f4" strokeWidth="3" />
        <line x1="-5" y1="-55" x2="5" y2="-60" stroke="#b5d8f4" strokeWidth="3" />

        <line x1="0" y1="-82" x2="0" y2="-90" stroke="#1f1b1c" strokeWidth="3" />

        <g>
          <path
            d="M 0,-120 C 8,-108 10,-96 0,-90 C -10,-96 -8,-108 0,-120 Z"
            fill="#fbbf24"
            stroke="#1f1b1c"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M 0,-111 C 4,-104 4,-97 0,-93 C -4,-97 -4,-104 0,-111 Z" fill="#fef08a" />
          <g stroke="#1f1b1c" strokeWidth="2.8" strokeLinecap="round">
            <line x1="-22" y1="-122" x2="-16" y2="-117" />
            <line x1="-28" y1="-106" x2="-20" y2="-104" />
            <line x1="-24" y1="-91" x2="-18" y2="-92" />
            <line x1="22" y1="-122" x2="16" y2="-117" />
            <line x1="28" y1="-106" x2="20" y2="-104" />
            <line x1="24" y1="-91" x2="18" y2="-92" />
          </g>
        </g>
      </g>

      <g stroke="#163252" strokeWidth="5" strokeLinecap="round">
        <line x1="98" y1="154" x2="111" y2="162" />
        <line x1="90" y1="188" x2="105" y2="188" />
        <line x1="308" y1="156" x2="296" y2="164" />
        <line x1="315" y1="189" x2="300" y2="189" />
      </g>

      <PeekingKitten
        x={320}
        y={358}
        scale={0.86}
        withHat={true}
        hatTilt={14}
        eyes="dot"
      />
    </svg>
  );
}

/**
 * SLIDE 4: "YOU HAVE A MESSAGE"
 */
export function Slide4Message({
  onOpen,
  customSlideImg,
}: {
  onOpen?: () => void;
  customSlideImg?: string;
}) {
  if (customSlideImg) {
    return (
      <img
        src={customSlideImg}
        alt="You have a message"
        onClick={onOpen}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover block select-none cursor-pointer"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full block select-none cursor-pointer"
      onClick={onOpen}
    >
      <SharedSvgDefs />
      <CheckeredCardBg />

      <HeartIcon x={158} y={48} scale={0.9} rotate={-8} outlined={true} />

      <g stroke="#163252" strokeWidth="4" strokeLinecap="round">
        <line x1="23" y1="242" x2="37" y2="248" />
        <line x1="25" y1="276" x2="39" y2="269" />
        <line x1="40" y1="298" x2="46" y2="286" />
      </g>

      <g transform="translate(182, 198) rotate(-6)">
        <path
          d="M -126,-48 L 0,-138 L 126,-48 L 126,110 L -126,110 Z"
          fill="#a9d0ee"
          stroke="#1f1b1c"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        <g transform="translate(0, -34)">
          <rect
            x="-104"
            y="-85"
            width="208"
            height="155"
            rx="4"
            fill="#fdfaf2"
            stroke="#364f6b"
            strokeWidth="2.6"
          />
          <rect
            x="-92"
            y="-73"
            width="184"
            height="132"
            rx="6"
            fill="#d4ebfc"
            stroke="#6a88a7"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <text
            x="0"
            y="-22"
            fill="#567898"
            className="font-kawaii"
            fontSize="28"
            fontWeight="700"
            letterSpacing="1.5"
            textAnchor="middle"
          >
            YOU HAVE
          </text>
          <text
            x="0"
            y="14"
            fill="#567898"
            className="font-kawaii"
            fontSize="28"
            fontWeight="700"
            letterSpacing="1.5"
            textAnchor="middle"
          >
            A MESSAGE
          </text>
        </g>

        <path
          d="M -126,-48 L 0,32 L -126,110 Z"
          fill="#c4e1f7"
          stroke="#1f1b1c"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          d="M 126,-48 L 0,32 L 126,110 Z"
          fill="#c4e1f7"
          stroke="#1f1b1c"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        <path
          d="M -126,110 L 0,24 L 126,110 Z"
          fill="#badcf6"
          stroke="#1f1b1c"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />

        <path
          d="M 0,46 C -5,38 -18,30 -18,20 C -18,12 -10,8 -4,14 C -1,17 0,20 0,20 C 0,20 1,17 4,14 C 10,8 18,12 18,20 C 18,30 5,38 0,46 Z"
          fill="#fdfaf0"
          stroke="#1f1b1c"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
      </g>

      <HeartIcon x={256} y={342} scale={1} rotate={-12} />

      <g transform="translate(316, 315)">
        <path
          d="M 30,42 C 56,42 72,22 66,4 C 62,-6 52,-4 50,6 C 48,16 38,26 24,28 Z"
          fill="#a8a39d"
          stroke="#1f1b1c"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M 52,18 L 63,22 M 44,29 L 53,36" stroke="#6b6660" strokeWidth="4.5" strokeLinecap="round" />

        <path
          d="M -28,0 C -34,22 -30,46 -18,54 L 26,54 C 38,46 38,18 24,-2 Z"
          fill="#ffffff"
          stroke="#1f1b1c"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M 8,-2 C 26,4 36,22 32,46 L 14,46 C 16,24 12,8 4,-2 Z" fill="#a8a39d" />
        <path d="M 20,16 L 32,14 M 22,28 L 34,27" stroke="#6b6660" strokeWidth="5" strokeLinecap="round" />

        <ellipse cx="-14" cy="54" rx="11" ry="6.5" fill="#ffffff" stroke="#1f1b1c" strokeWidth="3.2" />
        <ellipse cx="10" cy="54" rx="11" ry="6.5" fill="#ffffff" stroke="#1f1b1c" strokeWidth="3.2" />

        <path
          d="M -22,6 C -38,2 -52,-10 -48,-20 C -44,-28 -32,-22 -18,-8"
          fill="#ffffff"
          stroke="#1f1b1c"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <g stroke="#163252" strokeWidth="2.8" strokeLinecap="round">
          <line x1="-54" y1="-42" x2="-48" y2="-36" />
          <line x1="-62" y1="-31" x2="-55" y2="-28" />
          <line x1="-60" y1="-18" x2="-53" y2="-18" />
        </g>

        <g transform="translate(2, -32) rotate(12) scale(0.66)">
          <path
            d="M -55,-14 C -59,-36 -54,-56 -45,-61 C -36,-59 -25,-45 -19,-35 Z"
            fill="#a8a39d"
            stroke="#1f1b1c"
            strokeWidth="4.8"
            strokeLinejoin="round"
          />
          <path d="M -49,-22 C -51,-36 -48,-48 -43,-52 C -37,-49 -30,-40 -26,-33 Z" fill="#f5cbc5" />
          <path
            d="M 55,-14 C 59,-36 54,-56 45,-61 C 36,-59 25,-45 19,-35 Z"
            fill="#a8a39d"
            stroke="#1f1b1c"
            strokeWidth="4.8"
            strokeLinejoin="round"
          />
          <path d="M 49,-22 C 51,-36 48,-48 43,-52 C 37,-49 30,-40 26,-33 Z" fill="#f5cbc5" />

          <ellipse
            cx="0"
            cy="2"
            rx="64"
            ry="46"
            fill="#a8a39d"
            stroke="#1f1b1c"
            strokeWidth="4.8"
          />
          <path d="M 0,-18 C -16,0 -42,24 -52,40 C -20,50 20,50 52,40 C 42,24 16,0 0,-18 Z" fill="#ffffff" />
          <path
            d="M -12,-40 L -10,-21 M 0,-42 L 0,-23 M 12,-40 L 10,-21"
            stroke="#6b6660"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <ellipse cx="-32" cy="18" rx="10" ry="6" fill="#f5b3a9" />
          <ellipse cx="32" cy="18" rx="10" ry="6" fill="#f5b3a9" />
          <circle cx="-23" cy="8" r="6" fill="#1f1b1c" />
          <path d="M 16,9 Q 24,3 31,10" fill="none" stroke="#1f1b1c" strokeWidth="4.8" strokeLinecap="round" />
          <path d="M -7,15 Q -3.5,20 0,14.5 Q 3.5,20 7,15" fill="none" stroke="#1f1b1c" strokeWidth="3.8" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

/**
 * SLIDE 6: "SEMOGA KITA BISA SAMA² TERUS YA"
 * When the user picks `6_20260927_012054_0005.png` (full square card), it renders that exact image 100% untouched!
 */
export function Slide6Together({
  fullSlideImg,
  couplePhotoImg,
  onPickSlide6File,
}: {
  fullSlideImg?: string;
  couplePhotoImg?: string;
  onPickSlide6File: () => void;
}) {
  // If the user uploaded the full `6_20260927_012054_0005.png` image, render it 100% untouched without changing a single pixel!
  if (fullSlideImg) {
    return (
      <div className="relative w-full h-full select-none overflow-hidden">
        <img
          src={fullSlideImg}
          alt="Semoga kita bisa sama2 terus ya"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover block"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      <svg viewBox="0 0 400 400" className="w-full h-full block">
        <SharedSvgDefs />
        <StripedCardBg />

        {/* Top Scalloped Cloud */}
        <g transform="translate(206, 88)">
          <path
            d="
              M -146,12
              C -162,-6 -152,-36 -126,-40
              C -122,-64 -92,-76 -68,-64
              C -52,-86 -14,-88 4,-68
              C 26,-86 64,-82 76,-58
              C 104,-66 132,-48 128,-22
              C 154,-14 160,18 138,34
              C 142,56 116,72 92,62
              C 74,76 42,74 26,60
              L -30,60
              C -48,74 -80,74 -96,58
              C -122,66 -148,48 -140,24
              Z
            "
            fill="#fdfaf2"
            stroke="#6a88a7"
            strokeWidth="2.4"
          />
        </g>

        <defs>
          <path id="s6-arch1" d="M 82,88 Q 206,15 330,88" />
          <path id="s6-arch2" d="M 96,120 Q 206,58 316,120" />
        </defs>

        <text
          fill="#163252"
          className="font-kawaii"
          fontSize="26"
          fontWeight="700"
          letterSpacing="1.5"
          textAnchor="middle"
        >
          <textPath href="#s6-arch1" startOffset="50%">
            SEMOGA KITA BISA
          </textPath>
        </text>
        <text
          fill="#163252"
          className="font-kawaii"
          fontSize="25"
          fontWeight="700"
          letterSpacing="1.5"
          textAnchor="middle"
        >
          <textPath href="#s6-arch2" startOffset="50%">
            SAMA² TERUS YA
          </textPath>
        </text>

        {/* Left Light Blue Heart */}
        <g transform="translate(173, 114) scale(1.18)">
          <path
            d="M 0,9 C -3,4 -11,-1 -11,-7 C -11,-12 -6,-14 -2,-10 C -0.5,-8.5 0,-7 0,-7 C 0,-7 0.5,-8.5 2,-10 C 6,-14 11,-12 11,-7 C 11,-1 3,4 0,9 Z"
            fill="#5bc0f8"
            stroke="#2992d0"
            strokeWidth="1.2"
          />
          <ellipse cx="-4.5" cy="-7.5" rx="2.2" ry="1.2" transform="rotate(-30 -4.5 -7.5)" fill="#ffffff" opacity="0.7" />
        </g>
        {/* Right Royal Blue Heart */}
        <g transform="translate(242, 114) scale(1.18)">
          <path
            d="M 0,9 C -3,4 -11,-1 -11,-7 C -11,-12 -6,-14 -2,-10 C -0.5,-8.5 0,-7 0,-7 C 0,-7 0.5,-8.5 2,-10 C 6,-14 11,-12 11,-7 C 11,-1 3,4 0,9 Z"
            fill="#1d70d6"
            stroke="#134ca0"
            strokeWidth="1.2"
          />
          <ellipse cx="-4.5" cy="-7.5" rx="2.2" ry="1.2" transform="rotate(-30 -4.5 -7.5)" fill="#ffffff" opacity="0.6" />
        </g>

        <HeartIcon x={118} y={178} scale={0.9} rotate={-15} outlined={true} />
        <line x1="104" y1="196" x2="115" y2="201" stroke="#163252" strokeWidth="4" strokeLinecap="round" />
        <HeartIcon x={70} y={222} scale={1.05} rotate={-18} />

        <HeartIcon x={300} y={178} scale={0.9} rotate={15} outlined={true} />
        <line x1="316" y1="198" x2="304" y2="202" stroke="#163252" strokeWidth="4" strokeLinecap="round" />
        <HeartIcon x={346} y={222} scale={1.05} rotate={18} />

        <PeekingKitten
          x={208}
          y={192}
          scale={0.86}
          withHat={true}
          hatTilt={4}
          eyes="squint"
        />
      </svg>

      {/* Bottom Rectangular Couple Photo Frame */}
      <div
        onClick={onPickSlide6File}
        className="absolute left-[18.5%] right-[15.5%] top-[57.5%] bottom-[7.5%] bg-[#eef6fc] overflow-hidden shadow-sm cursor-pointer flex flex-col items-center justify-center"
      >
        <img
          src={couplePhotoImg || defaultDavinaPhoto}
          alt="Ammar dan Davina"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

/**
 * SLIDE 7: "THANK YOU For being such a special part of my life✨"
 */
export function Slide7ThankYou({ customSlideImg }: { customSlideImg?: string }) {
  if (customSlideImg) {
    return (
      <img
        src={customSlideImg}
        alt="Thank You"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover block select-none"
      />
    );
  }

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full block select-none">
      <SharedSvgDefs />
      <CheckeredCardBg />

      <g transform="translate(202, 118)">
        <path
          d="
            M -134,8
            C -152,-12 -142,-42 -114,-46
            C -108,-72 -76,-82 -52,-68
            C -34,-90 6,-90 24,-68
            C 50,-84 88,-76 96,-50
            C 124,-54 148,-30 138,-2
            C 156,16 146,48 120,52
            C 110,76 78,84 54,70
            C 34,88 -4,88 -24,70
            C -50,84 -84,78 -94,54
            C -122,56 -144,32 -134,8 Z
          "
          fill="#fdfaf2"
          stroke="#46627f"
          strokeWidth="2.5"
        />
        <path
          d="
            M -124,7
            C -140,-10 -131,-37 -105,-41
            C -100,-64 -70,-73 -48,-60
            C -31,-80 5,-80 22,-60
            C 46,-75 80,-68 88,-44
            C 114,-48 136,-26 127,-1
            C 143,15 134,43 110,47
            C 101,68 72,75 50,62
            C 31,79 -4,79 -22,62
            C -46,75 -77,70 -86,48
            C -112,50 -132,28 -124,7 Z
          "
          fill="none"
          stroke="#6a88a7"
          strokeWidth="1.6"
          strokeDasharray="5 5"
        />

        <defs>
          <path id="s7-arch" d="M -105,-8 Q 0,-56 105,-8" />
        </defs>
        <text
          fill="#163252"
          className="font-kawaii"
          fontSize="33"
          fontWeight="700"
          letterSpacing="2"
          textAnchor="middle"
        >
          <textPath href="#s7-arch" startOffset="50%">
            THANK YOU
          </textPath>
        </text>

        <HeartIcon x={-111} y={-9} scale={0.88} rotate={-20} />
        <HeartIcon x={115} y={-9} scale={0.88} rotate={20} />

        <g transform="translate(2, 26) rotate(-5)">
          <rect
            x="-42"
            y="-26"
            width="84"
            height="52"
            rx="4"
            fill="#c3e0f7"
            stroke="#1f1b1c"
            strokeWidth="3.2"
          />
          <path
            d="M -42,-26 L 0,4 L 42,-26"
            fill="none"
            stroke="#1f1b1c"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M -42,26 L -12,2 M 42,26 L 12,2"
            fill="none"
            stroke="#1f1b1c"
            strokeWidth="2.6"
          />
          <path
            d="M 0,11 C -3,6 -11,1 -11,-5 C -11,-9 -6,-11 -2,-7 C -0.5,-5.5 0,-4 0,-4 C 0,-4 0.5,-5.5 2,-7 C 6,-11 11,-9 11,-5 C 11,1 3,6 0,11 Z"
            fill="#fdfaf0"
            stroke="#1f1b1c"
            strokeWidth="2.8"
          />
        </g>
      </g>

      <g transform="translate(56, 315)">
        <path
          d="M -22,42 C -46,40 -54,14 -44,-2 C -38,-10 -28,-6 -28,4 C -28,16 -22,26 -14,30 Z"
          fill="#a8a39d"
          stroke="#1f1b1c"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M -44,12 L -32,15 M -40,25 L -28,28" stroke="#6b6660" strokeWidth="4.5" strokeLinecap="round" />

        <path
          d="M -24,-2 C -32,20 -30,46 -16,54 L 22,54 C 34,46 32,20 22,-2 Z"
          fill="#ffffff"
          stroke="#1f1b1c"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M -24,2 C -30,18 -28,38 -20,48 L -10,48 C -14,32 -14,16 -10,2 Z" fill="#a8a39d" />
        <path d="M -28,16 L -16,18 M -28,28 L -16,30" stroke="#6b6660" strokeWidth="4.5" strokeLinecap="round" />

        <path
          d="M -6,18 L -6,50 M 10,18 L 10,50"
          stroke="#1f1b1c"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse cx="-10" cy="53" rx="10" ry="6" fill="#ffffff" stroke="#1f1b1c" strokeWidth="3.2" />
        <ellipse cx="8" cy="53" rx="10" ry="6" fill="#ffffff" stroke="#1f1b1c" strokeWidth="3.2" />
        <ellipse cx="22" cy="51" rx="9" ry="5.5" fill="#ffffff" stroke="#1f1b1c" strokeWidth="3.2" />

        <g transform="translate(2, -36) scale(0.7)">
          <path
            d="M -55,-14 C -59,-36 -54,-56 -45,-61 C -36,-59 -25,-45 -19,-35 Z"
            fill="#a8a39d"
            stroke="#1f1b1c"
            strokeWidth="4.6"
            strokeLinejoin="round"
          />
          <path d="M -49,-22 C -51,-36 -48,-48 -43,-52 C -37,-49 -30,-40 -26,-33 Z" fill="#f5cbc5" />
          <path
            d="M 55,-14 C 59,-36 54,-56 45,-61 C 36,-59 25,-45 19,-35 Z"
            fill="#a8a39d"
            stroke="#1f1b1c"
            strokeWidth="4.6"
            strokeLinejoin="round"
          />
          <path d="M 49,-22 C 51,-36 48,-48 43,-52 C 37,-49 30,-40 26,-33 Z" fill="#f5cbc5" />

          <ellipse
            cx="0"
            cy="2"
            rx="64"
            ry="46"
            fill="#a8a39d"
            stroke="#1f1b1c"
            strokeWidth="4.6"
          />
          <path d="M 0,-18 C -16,0 -42,24 -52,40 C -20,50 20,50 52,40 C 42,24 16,0 0,-18 Z" fill="#ffffff" />
          <path
            d="M -12,-40 L -10,-21 M 0,-42 L 0,-23 M 12,-40 L 10,-21"
            stroke="#6b6660"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <ellipse cx="-32" cy="18" rx="10" ry="6" fill="#f5b3a9" />
          <ellipse cx="32" cy="18" rx="10" ry="6" fill="#f5b3a9" />
          <path d="M -31,10 Q -23,2 -15,10" fill="none" stroke="#1f1b1c" strokeWidth="4.6" strokeLinecap="round" />
          <path d="M 15,10 Q 23,2 31,10" fill="none" stroke="#1f1b1c" strokeWidth="4.6" strokeLinecap="round" />
          <path d="M -7,16 Q -3.5,21 0,15.5 Q 3.5,21 7,16" fill="none" stroke="#1f1b1c" strokeWidth="3.8" strokeLinecap="round" />
        </g>
      </g>

      <path
        d="
          M 103,344
          C 128,346 154,330 154,306
          C 154,292 144,288 140,298
          C 136,288 126,292 126,306
          C 126,330 146,342 163,344
        "
        fill="none"
        stroke="#43617d"
        strokeWidth="2.4"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />

      <g transform="translate(272, 254)">
        <text
          x="0"
          y="0"
          fill="#163252"
          className="font-kawaii"
          fontSize="20"
          fontWeight="700"
          textAnchor="middle"
        >
          For being such
        </text>
        <text
          x="0"
          y="26"
          fill="#163252"
          className="font-kawaii"
          fontSize="20"
          fontWeight="700"
          textAnchor="middle"
        >
          a special part of my
        </text>
        <text
          x="-12"
          y="52"
          fill="#163252"
          className="font-kawaii"
          fontSize="20"
          fontWeight="700"
          textAnchor="middle"
        >
          life
        </text>
        <g transform="translate(14, 42)">
          <path
            d="M 0,-11 Q 0,0 9,0 Q 0,0 0,11 Q 0,0 -9,0 Q 0,0 0,-11 Z"
            fill="#facc15"
          />
          <path
            d="M -7,5 Q -7,10 -3,10 Q -7,10 -7,15 Q -7,10 -11,10 Q -7,10 -7,5 Z"
            fill="#fde047"
          />
          <path
            d="M 7,-9 Q 7,-5 10,-5 Q 7,-5 7,-1 Q 7,-5 4,-5 Q 7,-5 7,-9 Z"
            fill="#fde047"
          />
        </g>
      </g>
    </svg>
  );
}
