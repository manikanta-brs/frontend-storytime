import { useGetCategoriesQuery } from "../store/category/categoryApiSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useGetLanguagesQuery } from "../store/language/languageApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateLanguageAPIMutation } from "../store/user/userApiSlice";
import {
  toggleLanguageSelection,
  setUserProfile,
} from "../store/user/authSlice"; // Import setUserProfile
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { useGetUserProfileAPIQuery } from "../store/user/userApiSlice"; // Import the hook
import { useEffect } from "react";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const { userData } = useSelector((state) => state.auth);
  const [useUpdateLanguageAPI, { isLoading: languageUpdateLoading }] =
    useUpdateLanguageAPIMutation();
  console.log("userdata:", userData); // Log the object properly
  const {
    data: languages,
    isLoading: isLanguagesLoading,
    error: languagesError,
  } = useGetLanguagesQuery();
  // console.log(categories);
  // const isLanguageSelected = (languageId) =>
  //   userData.languages && userData.languages.includes(languageId);
  const isLanguageSelected = (languageId) =>
    userData?.profileData?.languages?.includes(languageId); // Always use profileData.languages

  const { data: userProfileData, isLoading: isUserProfileLoading } =
    useGetUserProfileAPIQuery();
  // console.log(userProfileData);
  // useEffect(() => {
  //   if (userProfileData) {
  //     dispatch(
  //       setUserProfile({
  //         ...userProfileData, // Fetched data
  //         profileData: {
  //           ...userData?.profileData, // Keep the existing profileData
  //           ...userProfileData?.profileData, // Merge with fetched profileData
  //         },
  //         languages: userData?.languages || userProfileData?.languages, // Retain updated preferences
  //       })
  //     );
  //   }
  // }, [userProfileData, dispatch]);
  /*works fine just change for userData*/
  // useEffect(() => {
  //   if (userProfileData && !isUserProfileLoading) {
  //     // Only update if there's new data and it's not already in the state
  //     if (
  //       userData?.profileData?.languages !==
  //       userProfileData?.profileData?.languages
  //     ) {
  //       dispatch(
  //         setUserProfile({
  //           ...userData, // Keep existing user data
  //           profileData: {
  //             ...userData?.profileData, // Retain existing profile data
  //             ...userProfileData?.profileData, // Merge fetched profile data
  //           },
  //           languages: userData?.languages || userProfileData?.languages, // Retain updated preferences
  //         })
  //       );
  //     }
  //   }
  // }, [userProfileData, dispatch, isUserProfileLoading]); // Remove userData from dependencies

  // const handleLanguageClick = async (languageId) => {
  //   try {
  //     const response = await useUpdateLanguageAPI({
  //       languageIds: userData.languages,
  //     }).unwrap();
  //     toast.success("Language preference updated successfully");
  //     if (userData.languages) {
  //       dispatch(toggleLanguageSelection(languageId));
  //     }
  //   } catch (error) {
  //     toast.error("Failed to update language preference");
  //     // console.log(error);
  //   }

  //   // console.log(languageId);
  //   // console.log(userData);
  // };
  // const handleLanguageClick = async (languageId) => {
  //   try {
  //     // Create a new array of selected languages
  //     const updatedLanguages = userData?.languages?.includes(languageId)
  //       ? userData.languages.filter((id) => id !== languageId) // Remove if already selected
  //       : [...(userData?.languages || []), languageId]; // Add if not selected

  //     // Update backend
  //     await useUpdateLanguageAPI({
  //       languageIds: updatedLanguages,
  //     }).unwrap();

  //     // Update Redux store
  //     dispatch(
  //       setUserProfile({
  //         ...userData,
  //         languages: updatedLanguages, // Update languages in Redux
  //       })
  //     );

  //     toast.success("Language preference updated successfully");
  //   } catch (error) {
  //     toast.error("Failed to update language preference");
  //     console.error(error);
  //   }
  // };// works fine
  const categoryHandler = (categoryName) => {
    navigate("/stories", { state: { categoryName } });
  };
  useEffect(() => {
    if (userProfileData && !isUserProfileLoading) {
      // Only update if there's new data and it's not already in the state
      if (
        JSON.stringify(userData?.profileData?.languages) !==
        JSON.stringify(userProfileData?.profileData?.languages)
      ) {
        dispatch(
          setUserProfile({
            ...userData, // Keep existing user data
            profileData: {
              ...userData?.profileData, // Retain existing profile data
              ...userProfileData?.profileData, // Merge fetched profile data
              languages: userProfileData?.profileData?.languages, // Always use profileData.languages
            },
          })
        );
      }
    }
  }, [userProfileData, dispatch, isUserProfileLoading]); // Remove userData from dependencies
  const handleLanguageClick = async (languageId) => {
    try {
      // Create a new array of selected languages from profileData.languages
      const updatedLanguages = userData?.profileData?.languages?.includes(
        languageId
      )
        ? userData.profileData.languages.filter((id) => id !== languageId) // Remove if already selected
        : [...(userData?.profileData?.languages || []), languageId]; // Add if not selected

      // Update backend with the new languages
      await useUpdateLanguageAPI({
        languageIds: updatedLanguages,
      }).unwrap();

      // // Update Redux store with the new profileData.languages
      // dispatch(
      //   setUserProfile({
      //     ...userData,
      //     profileData: {
      //       ...userData?.profileData,
      //       languages: updatedLanguages, // Update languages within profileData
      //     },
      //   })
      // );
      /*userData changes*/
      dispatch(
        setUserProfile({
          ...userData,
          profileData: {
            ...userData?.profileData,
            languages: updatedLanguages, // Only update profileData.languages
          },
        })
      );

      toast.success("Language preference updated successfully");
    } catch (error) {
      toast.error("Failed to update language preference");
      console.error(error);
    }
  };
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
                {isLanguagesLoading || isUserProfileLoading ? (
                  <LoadingSpinner />
                ) : languagesError ? (
                  <p>Unable to load the languages, Please try again</p>
                ) : (
                  <>
                    {languages &&
                      languages.map((language) => (
                        <div key={language._id}>
                          <button
                            className={`flex ${
                              isLanguageSelected(language._id)
                                ? "bg-white text-black"
                                : "text-white"
                            }  px-3 py-1 rounded-full mr-3`}
                            onClick={() => handleLanguageClick(language._id)}
                          >
                            {language.name}
                            {isLanguageSelected(language._id) ? (
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
                            ) : (
                              ""
                            )}
                          </button>
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
                      onClick={() => categoryHandler(category.category)}
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
