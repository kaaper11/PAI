import React, { useState, useRef, useEffect } from "react";

const MainPage = () => {
    const siema = ["/1.png", "/2.png", "/3.png", "/4.png", "/2.png", "/3.png", "/4.png"];
    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const trackRef = useRef(null);

    const extended = [
        siema[siema.length - 1],
        ...siema,
        siema[0],
        siema[1],
        siema[2]
    ];

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIndex((prev) => prev - 1);
    };

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(${-400 * (index + 1)}px)`;
        const handleTransitionEnd = () => {
            setIsAnimating(false);

            if (index >= siema.length) {
                track.style.transition = "none";
                setIndex(0);
                track.style.transform = `translateX(${-400}px)`;
            } else if (index < 0) {
                track.style.transition = "none";
                setIndex(siema.length - 1);
                track.style.transform = `translateX(${-400 * siema.length}px)`;
            }
        };

        track.addEventListener("transitionend", handleTransitionEnd);
        return () => track.removeEventListener("transitionend", handleTransitionEnd);
    }, [index]);

    return (
        <div className="flex flex-col items-center    h-screen bg-gray-200">

            <div className="relative py-10 w-[400px] md:w-[800px] lg:w-[1200px] overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex"
                    style={{
                        width: `${extended.length * 400}px`,
                        transform: `translateX(${-400 * (index + 1)}px)`,
                    }}
                >
                    {extended.map((src, i) => (
                        <div className={"w-[400px]"}>
                            <div className={"flex flex-col gap-1 rounded-md items-center justify-center w-[395px] h-full bg-[var(--color-accent)] border-2 border-[var(--color-primary)]"}>
                                <img
                                    key={i}
                                    src={src}
                                    className=" w-[350px] h-[250px] object-cover flex-shrink-0  mx-[1px] py-2"
                                />
                                <div>
                                    <p>Jestem wesly romek</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handlePrev}
                    className=" absolute  -translate-y-45 px-3 py-2 rotate-180 cursor-pointer"
                >
                    <img src={"/next.png"} alt="Next image" />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-0 -translate-y-1/2 px-3 py-2 cursor-pointer"
                >
                    <img src={"/next.png"} alt="Next image" />
                </button>
            </div>


        </div>
    );
};

export default MainPage;
