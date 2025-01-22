import NavigationBar from "../components/NavigationBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import ImageBanner from "../components/home/ImageBanner.jsx";
import PopularStories from "../components/home/PopularStories.jsx";
import ShowsOfWeek from "../components/home/ShowsOfWeek.jsx";
import TopStories from "../components/home/TopStories.jsx";
import { setUserProfile } from "../store/user/authSlice.js";
import { useGetUserProfileAPIQuery } from "../store/user/userApiSlice.js";
import { useEffect, useState } from "react";
import {
  useGetPopularShowsQuery,
  useGetShowsOfTheWeekQuery,
  useGetTopStoriesQuery,
} from "../store/spotify/spotifyApiSlice";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
// const showsOfWeeklist = [
//   {
//     id: 1,
//     name: "History",
//     url: "./images/image.png",
//     publisher: "sam",
//   },
//   {
//     id: 2,
//     name: "Geography",
//     url: "./images/image.png",
//     publisher: "john",
//   },
//   {
//     id: 3,
//     name: "Science",
//     url: "./images/image.png",
//     publisher: "sarah",
//   },
//   {
//     id: 4,
//     name: "Technology",
//     url: "./images/image.png",
//     publisher: "jane",
//   },
//   {
//     id: 5,
//     name: "Entertainment",
//     url: "./images/image.png",
//     publisher: "bill",
//   },
//   {
//     id: 6,
//     name: "Business",
//     url: "./images/image.png",
//     publisher: "tom",
//   },
// ];
// const topStoriesList = [
//   {
//     id: 1,
//     name: "History",
//     url: "./images/image.png",
//     publisher: "sam",
//   },
//   {
//     id: 2,
//     name: "Geography",
//     url: "./images/image.png",
//     publisher: "john",
//   },
//   {
//     id: 3,
//     name: "Science",
//     url: "./images/image.png",
//     publisher: "sarah",
//   },
//   {
//     id: 4,
//     name: "Technology",
//     url: "./images/image.png",
//     publisher: "jane",
//   },
//   {
//     id: 5,
//     name: "Entertainment",
//     url: "./images/image.png",
//     publisher: "bill",
//   },
//   {
//     id: 6,
//     name: "Business",
//     url: "./images/image.png",
//     publisher: "tom",
//   },
// ];
// const popularStoryList = [
//   {
//     id: 1,
//     name: "History",
//     url: "./images/image.png",
//     publisher: "sam",
//   },
//   {
//     id: 2,
//     name: "Geography",
//     url: "./images/image.png",
//     publisher: "john",
//   },
//   {
//     id: 3,
//     name: "Science",
//     url: "./images/image.png",
//     publisher: "sarah",
//   },
//   {
//     id: 4,
//     name: "Technology",
//     url: "./images/image.png",
//     publisher: "jane",
//   },
//   {
//     id: 5,
//     name: "Entertainment",
//     url: "./images/image.png",
//     publisher: "bill",
//   },
//   {
//     id: 6,
//     name: "Business",
//     url: "./images/image.png",
//     publisher: "tom",
//   },
// ];
const HomePage = () => {
  const dispatch = useDispatch();
  const { data: userProfileData, isLoading: isUserProfileLoading } =
    useGetUserProfileAPIQuery();
  const { userData } = useSelector((state) => state.auth);
  // console.log(data);
  // console.log(userData);
  const [popularStories, setPopularStories] = useState([]);
  const [topStories, setTopStories] = useState([]);
  const [showsOfTheWeek, setShowsOfTheWeek] = useState([]);

  const { data: popularShowsData, isLoading: popularShowsLoading } =
    useGetPopularShowsQuery({
      queryParams: {
        q: '"popular stories", "popular podcasts", "kids-stories", language:"tamil" "telugu" "english" "hindi"',
        type: "show",
        include_external: "audio",
        market: "IN",
        limit: "25",
      },
    });
  const { data: topStoriesData, isLoading: topStoriesLoading } =
    useGetTopStoriesQuery({
      queryParams: {
        q: '"top-stories" "top-podcasts" language: "tamil" "telugu" "english" "hindi" ',
        type: "show",
        include_external: "audio",
        market: "IN",
        limit: "25",
      },
    });

  const { data: showsOfWeekData, isLoading: showsOfWeekLoading } =
    useGetShowsOfTheWeekQuery({
      queryParams: {
        q: '"shows-of-the-week" "this-week-shows" language: "tamil" "telugu" "english" "hindi" ',
        type: "show",
        include_external: "audio",
        market: "IN",
        limit: "25",
      },
    });
  // console.log(popularShowsData.shows.items.images);
  // useEffect(() => {
  //   if (data) {
  //     dispatch(setUserProfile({ ...data }));
  //   }
  // }, [data, dispatch]);
  // useEffect(() => {
  //   if (data) {
  //     // Merge updated languages into userData if already present
  //     dispatch(
  //       setUserProfile({
  //         ...data,
  //         languages: userData.languages || data.languages, // Retain updated preferences
  //       })
  //     );
  //   }
  // }, [data, dispatch, userData.languages]);//working well
  // useEffect(() => {
  //   if (data) {
  //     dispatch(
  //       setUserProfile({
  //         ...data, // Fetched data
  //         profileData: {
  //           ...userData.profileData, // Retain existing profileData
  //           ...data.profileData, // Merge with fetched profileData
  //         },
  //         languages: userData.languages || data.languages, // Retain updated preferences
  //       })
  //     );
  //   }
  // }, [data, dispatch, userData]);
  // useEffect(() => {
  //   if (data) {
  //     // Merge the userData with the new profile data and language
  //     dispatch(
  //       setUserProfile({
  //         ...data, // Fetched data
  //         profileData: {
  //           ...userData.profileData, // Keep the existing profileData
  //           ...data.profileData, // Merge with fetched profileData
  //         },
  //         languages: userData.languages || data.languages, // Retain updated preferences
  //       })
  //     );
  //   }
  // }, [data, dispatch]); // Only depend on data and dispatch
  useEffect(() => {
    if (data && !isUserProfileLoading) {
      // Only update if there's new data and it's not already in the state
      if (userData?.profileData?.languages !== data?.profileData?.languages) {
        dispatch(
          setUserProfile({
            ...data, // Fetched data
            profileData: {
              ...userData?.profileData, // Retain existing profile data
              ...data?.profileData, // Merge fetched profile data
            },
            languages: userData?.languages || data?.languages, // Retain updated preferences
          })
        );
      }
    }
  }, [data, dispatch, isUserProfileLoading]); // Remove userData from dependencies
  useEffect(() => {
    if (popularShowsData) {
      const nonExplicitPopularStories = popularShowsData.shows.items.filter(
        (story) => !story.explicit
      );
      setPopularStories(nonExplicitPopularStories.slice(0, 6));
    }

    if (topStoriesData) {
      const nonExplicitTopStories = topStoriesData.shows.items.filter(
        (story) => !story.explicit
      );
      setTopStories(nonExplicitTopStories.slice(0, 4));
    }
    if (showsOfWeekData) {
      const nonExplicitShowsOfWeek = showsOfWeekData.shows.items.filter(
        (story) => !story.explicit
      );
      setShowsOfTheWeek(nonExplicitShowsOfWeek.slice(0, 3));
    }
  }, [popularShowsData, topStoriesData, showsOfWeekData]);
  // useEffect(() => {
  //   refetchUserProfileData();
  // }, []);
  return (
    // <>
    //   {/* <div className="container mx-auto p-2">
    //     <ImageBanner />
    //     <section>
    //       <div className="container mx-auto">
    //         <div>
    //           <header className="flex items-center justify-between mb-2 mt-6">
    //             <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:corsor-pointer">
    //               Popular Stories
    //             </div>
    //             <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
    //               SEE ALL
    //             </div>
    //             <PopularStories stories={popularStoryList} />
    //           </header>
    //         </div>
    //       </div>
    //     </section>
    //   </div> */}
    //   {/* <NavigationBar /> */}
    //   <div className="container mx-auto p-2">
    //     <ImageBanner />
    //     <section>
    //       <header className="flex items-center justify-between mb-2 mt-6">
    //         <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
    //           Popular Stories
    //         </div>
    //         <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
    //           SEE ALL
    //         </div>
    //       </header>
    //       {/* <PopularStories stories={popularStoryList} /> */}
    //       {popularShowsLoading ? (
    //         <LoadingSpinner />
    //       ) : (
    //         popularStories && <PopularStories stories={popularStories} />
    //       )}
    //     </section>
    //     <div>
    //       <header className="flex items-center justify-between mb-2 mt-6">
    //         <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
    //           Top Stories & Podcasts
    //         </div>
    //         <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
    //           SEE ALL
    //         </div>
    //       </header>
    //       <TopStories stories={topStoriesList} />
    //     </div>
    //     <div>
    //       <header className="flex items-center justify-between mb-2 mt-6">
    //         <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
    //           Shows of the week
    //         </div>
    //         <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
    //           SEE ALL
    //         </div>
    //       </header>
    //       <ShowsOfWeek stories={showsOfWeeklist} />
    //     </div>
    //   </div>
    // </>
    <>
      <div className="container mx-auto p-2">
        <ImageBanner />
        <section>
          <div className="container mx-auto">
            <div>
              <header className="flex items-center justify-between mb-2 mt-6">
                <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
                  Popular
                </div>

                <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
                  SEE ALL
                </div>
              </header>

              {/* <PopularStories stories={popularStoryList} /> */}
              {popularShowsLoading ? (
                <LoadingSpinner />
              ) : (
                popularStories && <PopularStories stories={popularStories} />
              )}
            </div>

            <div>
              <header className="flex items-center justify-between mb-2">
                <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
                  Top Stories & Podcasts
                </div>

                <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
                  SEE ALL
                </div>
              </header>
              {topStoriesLoading ? (
                <LoadingSpinner />
              ) : (
                topStories && <TopStories stories={topStories} />
              )}
            </div>

            <div>
              <header className="flex items-center justify-between mb-2">
                <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
                  Shows of the week
                </div>

                <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
                  SEE ALL
                </div>
              </header>
              {showsOfWeekLoading ? (
                <LoadingSpinner />
              ) : (
                showsOfTheWeek && <ShowsOfWeek stories={showsOfTheWeek} />
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
