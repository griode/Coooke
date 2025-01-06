import Image from "next/image";
import {BsPersonCircle} from "react-icons/bs";

export default function Avatar({
                                   src,
                                   alt,
                                   width,
                                   height,
                                   onClick,
                                   className,
                               }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    radius?: number;
    onClick?: () => void;
    className?: string;
}) {
    return (
        <div
            onClick={onClick}
            className={`bg-slate-100 cursor-pointer rounded-full overflow-hidden ${className}`}
        >
            {
                (src == "" || src == null) ?
                    <div className={"w-full text-4xl h-full flex justify-center items-center"}>
                        <BsPersonCircle className="text-3xl"/>
                    </div> : (<Image
                        className="object-cover w-full h-full"
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                    />)
            }

        </div>
    );
}
