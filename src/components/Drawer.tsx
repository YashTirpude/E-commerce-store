import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { PanelLeftDashed } from "lucide-react";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();

        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchCategories();
  });

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  return (
    <div className="relative h-fit ">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleDrawer}
        />
      )}

      <div className="xs:block sm:hidden ">
        <div className="text-center">
          <button
            onClick={toggleDrawer}
            className=" px-4 py-2 mx-2 rounded-full"
            type="button"
          >
            <PanelLeftDashed />
          </button>
        </div>

        <div
          id="drawer-example"
          className={`fixed top-0 left-0 z-40 w-80 h-full overflow-y-auto transition-transform  bg-white
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          tabIndex={-1}
          aria-labelledby="drawer-label"
        >
          <div className="p-4 relative h-full " data-theme="luxury">
            <button
              onClick={toggleDrawer}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>

            <div className="w-64 p-5 h-screen  ">
              <label className="flex justify-end pt-3   w-fit h-fit  cursor-pointer gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                  type="checkbox"
                  value="luxury"
                  className="toggle theme-controller"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
              <h1 className="text-2xl  font-bold mb-10 mt-4 cursor-pointer flex flex-col justify-start ">
                React Store
              </h1>

              <section>
                <input
                  type="text"
                  className="border-2 rounded  px-2 p-2 sm:mb-0"
                  placeholder="Search Product"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex justify-center items-center">
                  <input
                    type="number"
                    className="border-2 mr-2 px-5 py-3 mb-3 w-full"
                    placeholder="Min"
                    value={minPrice ?? ""}
                    onChange={handleMinPriceChange}
                  />
                  <input
                    type="number"
                    className="border-2  px-5 py-3 mb-5 mt-2 w-full"
                    placeholder="Max"
                    value={maxPrice ?? ""}
                    onChange={handleMaxPriceChange}
                  />
                </div>

                {/* Categories Section */}
                <div className="mb-5">
                  <h2 className="text-xl font-semibold mb-3">Categories</h2>
                  <div>
                    {categories.map((category, index) => (
                      <label key={index} className="block mb-2">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          onChange={() => handleRadioChangeCategories(category)}
                          checked={selectedCategory === category}
                          className="mr-2 w-[16px] h-[16px]"
                        />
                        {category.toUpperCase()}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Keywords Section */}
                <div className="mb-5">
                  <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                  <div>
                    {keywords.map((keyword, index) => (
                      <button
                        key={index}
                        onClick={() => handleKeywordClick(keyword)}
                        className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200 hover:text-black"
                      >
                        {keyword.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleResetFilters}
                  className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
                >
                  Reset Filters
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
