import {BsChevronLeft, BsChevronRight, BsStarFill} from "react-icons/bs";
import cake from "@/assets/icons/cake.png";
import burger from "@/assets/icons/burger.png";
import salad from "@/assets/icons/salad.png";
import Image, {StaticImageData} from "next/image";

interface Category {
    icon: StaticImageData;
    title: string;
    rating: number;
    bgColor?: string;
    textColor?: string;
}

const listCategories: Category[] = [
    {
        icon: cake,
        title: "Cakes",
        rating: 4.5,
        bgColor: "bg-slate-800",
        textColor: "text-white",
    },
    {
        icon: burger,
        title: "Burger",
        rating: 2.5,
        bgColor: "bg-orange-300",
        textColor: "text-black",
    },
    {
        icon: salad,
        title: "Salad",
        rating: 3.4,
        bgColor: "bg-slate-800",
        textColor: "text-white",
    },
];

export const CategorySection = () => {
    return (
        <div className="w-fit">
            <div className="flex items-center justify-between space-x-2">
                <button className="rounded-full p-2 hover:bg-gray-200">
                    <BsChevronLeft className="w-5 h-5"/>
                </button>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {listCategories.map((category, index) => (
                        <CategoryCard key={index} {...category} />
                    ))}
                </div>
                <button className="rounded-full p-2 hover:bg-gray-200">
                    <BsChevronRight className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
};

export const CategoryCard = ({
                                 icon,
                                 title,
                                 rating,
                                 bgColor = "bg-gray-200", // Valeur par défaut
                                 textColor = "text-gray-800", // Valeur par défaut
                             }: Category) => {
    return (
        <div className={`p-1 ${bgColor} ${textColor} rounded-full w-20`}>
            <div className="flex flex-col items-center justify-center">
                <div className="rounded-full bg-white p-3 w-full">
                    <Image
                        className="object-cover w-full h-full"
                        src={icon}
                        alt={title}
                    />
                </div>
                <div className="space-y-2 mx-4 my-3">
                    <h4 className="text-center text-sm">{title}</h4>
                    <div className="flex items-center space-x-1 text-xs">
                        <BsStarFill className={textColor} width={12} height={12}/>
                        <span>{rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};