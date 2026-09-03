import { useGetCategoryApiByNameQuery } from "@/api/api";
import { ChevronRight, LayoutDashboard } from "lucide-react";

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
  const { data, isLoading } = useGetCategoryApiByNameQuery();

  if (isLoading || !data) {
    return null; 
  }

  return (
    <div className="flex justify-start items-center gap-1 max-w-[1400px] overflow-x-auto">
      
      <div
        onClick={() => onSelectCategory(null)}
        className={`border-[1px] min-w-max bg-white hover:bg-gray-50 relative overflow-hidden active:scale-95 duration-75 cursor-pointer px-[15px] py-[5px] flex items-center gap-3 rounded-md transition-all ${
          selectedCategory === null ? "border-indigo-600" : "border-gray-200"
        }`}
      >
        <div className="min-h-[25px] flex justify-center items-center text-indigo-600">
          <LayoutDashboard size={20} />
        </div>
        <div className="font-semibold text-[14px]">All Products</div>

        <div
          className={`absolute h-[3px] duration-200 left-0 right-0 bottom-0 ${
            selectedCategory === null ? "bg-indigo-600" : "bg-transparent"
          }`}
        />
      </div>

      {data.map((item) => {
        const isSelected = String(selectedCategory) === item.id.toString();

        return (
          <div
            key={item.id}
            onClick={() => onSelectCategory(item.id.toString())}
            className={`border-[1px] w-[202px] min-w-max bg-white hover:bg-gray-50 relative overflow-hidden active:scale-95 duration-75 cursor-pointer px-[5px] sm:px-[10px] py-[5px] rounded-md shadow-sm flex justify-center items-center gap-1 transition-all ${
              isSelected ? "border-indigo-600" : "border-gray-200"
            }`}
          >
            <div>
              <img
                className="max-h-[20px] sm:max-h-[25px] sm:min-h-[25px] sm:min-w-[25px] object-contain"
                src={item.image}
                alt="Categories"
              />
            </div>
            <div className="font-semibold text-[12px] sm:text-[14px] truncate">
              {item.name}
            </div>

            <div
              className={`absolute h-[3px] duration-200 left-0 right-0 bottom-0 ${
                isSelected ? "bg-indigo-600" : "bg-transparent"
              }`}
            />
          </div>
        );
      })}
      <button className="cursor-pointer hover:text-indigo-600 hover:scale-110 active:scale-95 p-2 bg-white min-w-max">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default Categories;