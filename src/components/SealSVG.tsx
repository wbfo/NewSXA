export const SealSVG = ({
    className,
    color = "currentColor",
    withText = false,
    showText,
    size,
}: {
    className?: string;
    color?: string;
    withText?: boolean;
    showText?: boolean;
    size?: number;
}) => {
    const finalWithText = showText ?? withText;
    return (
        <svg
            className={className}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            {finalWithText && (
                <defs>
                    <path id="topArcSeal" d="M 20,100 A 80,80 0 0,0 180,100" />
                    <path id="bottomArcSeal" d="M 20,100 A 80,80 0 0,1 180,100" />
                </defs>
            )}
            <circle cx="100" cy="100" r="90" stroke={color} strokeWidth="2.5" />
            <circle cx="100" cy="100" r="76" stroke={color} strokeWidth="1" />
            <line x1="100" y1="10" x2="100" y2="24" stroke={color} strokeWidth="2" />
            <line x1="100" y1="176" x2="100" y2="190" stroke={color} strokeWidth="2" />
            <line x1="10" y1="100" x2="24" y2="100" stroke={color} strokeWidth="2" />
            <line x1="176" y1="100" x2="190" y2="100" stroke={color} strokeWidth="2" />
            {withText && (
                <>
                    <text
                        fontFamily="Montserrat, sans-serif"
                        fontSize="9.5"
                        fontWeight="700"
                        fill={color}
                        letterSpacing="0.18em"
                    >
                        <textPath href="#topArcSeal" startOffset="50%" textAnchor="middle">
                            SOVEREIGN X
                        </textPath>
                    </text>
                    <text
                        fontFamily="Montserrat, sans-serif"
                        fontSize="9.5"
                        fontWeight="600"
                        fill={color}
                        letterSpacing="0.18em"
                    >
                        <textPath href="#bottomArcSeal" startOffset="50%" textAnchor="middle">
                            · AUDITS ·
                        </textPath>
                    </text>
                </>
            )}
            <text
                x="100"
                y="115"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontSize="42"
                fontWeight="700"
                fill={color}
                letterSpacing="1"
            >
                SX
            </text>
            <line
                x1="68"
                y1="78"
                x2="132"
                y2="122"
                stroke={color}
                strokeWidth="0.75"
                opacity="0.4"
            />
        </svg>
    );
};

export default SealSVG;
