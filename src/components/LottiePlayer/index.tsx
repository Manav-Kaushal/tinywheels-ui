import lottie, { AnimationItem } from "lottie-web";
import { useEffect, useRef } from "react";

type LottiePlayerProps = {
  animationData: Record<string, any>;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  width?: number | string;
  height?: number | string;
  sx?: string;
};

const LottiePlayer: React.FC<LottiePlayerProps> = ({
  animationData,
  autoplay = true,
  loop = true,
  speed = 1,
  width = "100%",
  height = "100%",
  sx = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem>();

  useEffect(() => {
    if (containerRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop,
        autoplay,
        animationData,
      });
      animationRef.current.setSpeed(speed);
    }
    return () => {
      animationRef.current?.destroy();
    };
  }, [animationData, autoplay, loop, speed]);

  return (
    <div ref={containerRef} style={{ width, height }} className={sx}></div>
  );
};

export default LottiePlayer;
