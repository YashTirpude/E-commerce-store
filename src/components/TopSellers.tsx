import { useState, useEffect } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();
        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div
      className="p-5 mx-auto mt-14 border rounded shadow-sm
                    xs:hidden
                    lg:w-[23rem]
                   
                    w-full max-w-sm
                    sm:block
                    laptop:max-w-md
                    desktop:max-w-lg"
    >
      <h2
        className="text-xl font-bold mb-5 
                     sm:text-2xl 
                     laptop:text-3xl"
      >
        Top Sellers
      </h2>
      <ul className="space-y-4">
        {authors.map((author, index) => (
          <li key={index} className="flex items-center justify-between">
            <section className="flex items-center">
              <img
                src={author.image}
                className="w-12 h-12 rounded-full object-cover
                          sm:w-14 sm:h-14
                          laptop:w-16 laptop:h-16"
                alt={author.name}
              />
              <span
                className="ml-4 font-medium
                             sm:text-lg
                             laptop:text-xl"
              >
                {author.name}
              </span>
            </section>
            <button
              onClick={() => handleFollowClick(index)}
              className={`py-2 px-4 rounded-full transition-colors duration-200
                         ${
                           author.isFollowing
                             ? "bg-red-700 text-white hover:bg-red-800"
                             : "border border-gray-300 hover:bg-gray-50"
                         }
                         sm:px-5
                         laptop:px-6`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers;
