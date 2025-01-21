import { useGetCategoriesQuery } from "../store/category/categoryApiSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useGetLanguagesQuery } from "../store/language/languageApiSlice";

// const languages = [
//   { _id: 1, code: "ta", name: "Telugu" },
//   { _id: 2, code: "en", name: "English" },
//   { _id: 3, code: "hi", name: "Hindi" },
//   { _id: 4, code: "fr", name: "French" },
//   { _id: 5, code: "es", name: "Spanish" },
//   { _id: 6, code: "de", name: "German" },
//   { _id: 7, code: "ru", name: "Russian" },
// ];
// const categories = [
//   {
//     _id: 1,
//     name: "Popular Stories Podcasts",
//     keywords: "popular stories podcasts",
//   },
//   { _id: 2, name: "Fiction", keywords: "fiction" },
//   { _id: 3, name: "Non-Fiction", keywords: "non-fiction" },
//   { _id: 4, name: "Educational", keywords: "education" },
//   { _id: 5, name: "Children's Stories", keywords: "children's stories" },
//   { _id: 6, name: "Science Fiction", keywords: "science fiction" },
//   { _id: 7, name: "Thriller", keywords: "thriller" },
// ];

const CategoriesPage = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const {
    data: languages,
    isLoading: isLanguagesLoading,
    error: languagesError,
  } = useGetLanguagesQuery();
  console.log(categories);
  return (
    <>
      <div style={{ backgroundColor: "#443280" }}>
        <div className="container mx-auto px-6">
          <section>
            <div className="py-6 rounded-xl mt-5">
              <header className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold tracking-tight text-white hover:underline">
                  Languages
                </h3>
              </header>
              <div className="flex mb-10">
                {isLanguagesLoading ? (
                  <LoadingSpinner />
                ) : languagesError ? (
                  <p>Unable to load the languages, Please try again</p>
                ) : (
                  <>
                    {languages &&
                      languages.map((language) => (
                        <div
                          key={language._id}
                          className="flex items-center px-2 py-2 text-white font-medium bg-blue-600 hover:bg-white hover:text-black rounded-md mr-3"
                        >
                          {language.name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 ml-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      ))}
                  </>
                )}
                {/* {languages.map((language) => (
                  <div
                    key={language._id}
                    className="flex items-center px-2 py-2 text-white font-medium bg-blue-600 hover:bg-white hover:text-black rounded-md mr-3"
                  >
                    {language.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 ml-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                ))} */}
              </div>

              <div className="flex mb-10"></div>
              <header className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold tracking-tight text-white hover:underline">
                  Categories
                </h3>
              </header>

              <div className="grid grid-cols-4 gap-x-4 gap-y-4">
                {isLoading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <p>Unable to load the categories. Please try again later!.</p>
                ) : (
                  categories.map((category, index) => (
                    <div
                      key={category._id}
                      className={`p-6 rounded-xl hover:bg-active group active h-64 text-3xl flex items-end siraledge category-${
                        index + 1
                      }`}
                      onClick={() => {}}
                    >
                      <button className="text-left">{category.category}</button>
                    </div>
                  ))
                )}
                {/* {categories.map((category, index) => (
                  <div
                    key={category._id}
                    className={`p-6 rounded-xl hover:bg-active group active h-64 text-3xl flex items-end siraledge category-${
                      index + 1
                    }`}
                    onClick={() => {}}
                  >
                    <button className="text-left">{category.name}</button>
                  </div>
                ))} */}
              </div>
              <div className="grid grid-cols-4 gap-x-4 gap-y-4"></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
