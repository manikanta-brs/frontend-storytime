// To render the /authors page component
import { useEffect, useState } from "react";
import AuthorsList from "../components/authors/AuthorsList";
import { useGetCategoriesQuery } from "../store/category/categoryApiSlice";
import { useGetLanguagesQuery } from "../store/language/languageApiSlice";
import { useGetAuthorsStoriesQuery } from "../store/spotify/spotifyApiSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthorsPage = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [languageNames, setLanguageNames] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);

  // API Query
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: languagesData } = useGetLanguagesQuery();
  const {
    data: authorsData,
    isLoading: authorsIsLoading,
    isError: authorsIsError,
  } = useGetAuthorsStoriesQuery(
    {
      queryParams: {
        q: `"${categoryNames}" languages: ${languageNames}`,
        type: "show",
        include_external: "audio",
        market: "IN",
        limit: "50",
      },
    },
    {
      skip: !categoryNames || !languageNames, // Skip the query if categoryNames or languageNames are missing
    }
  );

  // Filter the explicit stories based on explicit property (this property will be present in response data)
  useEffect(() => {
    if (authorsData && authorsData.shows && authorsData.shows.items) {
      const nonExplicitAuthorsStories = authorsData.shows.items.filter(
        (story) => !story.explicit
      );

      setAuthorsList(nonExplicitAuthorsStories);
    } else {
      setAuthorsList([]);
    }
  }, [authorsData]);

  // format the category names (joining all names with ,)
  useEffect(() => {
    // if (categoriesData) {
    //   const formattedCategoryNames = categoriesData
    //     .map((category) => `"${category.category}"`)
    //     .join(", ");

    //   setCategoryNames(formattedCategoryNames);
    // }
    if (languagesData) {
      const formattedLanguageNames = languagesData
        .map((language) => `"${language.name}"`)
        .join(", ");

      setLanguageNames(formattedLanguageNames);
    }
  }, [categoriesData]);
  if (authorsIsError) {
    return (
      <div className="text-center my-16 text-red-500">
        Failed to load authors. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5 px-5">
      {authorsIsLoading ? (
        <LoadingSpinner />
      ) : authorsList?.length > 0 ? (
        <AuthorsList authors={authorsList} />
      ) : (
        <p className="text-center my-16">
          No Stories to load, please try later
        </p>
      )}
    </div>
  );
};

export default AuthorsPage;
