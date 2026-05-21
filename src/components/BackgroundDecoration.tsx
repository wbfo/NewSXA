import { cn } from "@/lib/utils";
import BackgroundGlow from "./BackgroundGlow";

interface BackgroundDecorationProps {
    type: "grid" | "dots" | "glow" | "scanlines" | "noise";
    className?: string;
    variant?: "navy" | "white" | "mixed";
}

export default function BackgroundDecoration({ type, className, variant = "white" }: BackgroundDecorationProps) {
    if (type === "grid") {
        return (
            <div className={cn("absolute inset-0 bg-grid-white pointer-events-none opacity-20", className)} />
        );
    }

    if (type === "dots") {
        return (
            <div className={cn("absolute inset-0 bg-dot-white pointer-events-none opacity-30", className)} />
        );
    }

    if (type === "glow") {
        return <BackgroundGlow variant={variant} className={className} />;
    }

    if (type === "scanlines") {
        return (
            <div className={cn("absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]", className)}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>
        );
    }

    if (type === "noise") {
        return <div className={cn("absolute inset-0 bg-noise pointer-events-none z-0", className)} />;
    }

    return null;
}
