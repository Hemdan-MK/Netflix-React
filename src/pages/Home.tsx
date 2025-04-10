import { useContext, useEffect, useState } from "react"
import { MovieIF } from "../Interface/Interface"
import { ViewContext } from "../context/MovieContext";
import { fetchAnimeList, fetchTopRated, fetchTrending, fetchTVSeries } from "../services/TMDB_API";

import Navbar from '../components/Header'
import { HeroSkeleton, MovieSectionSkeleton } from "../components/Loader";

import { tmbd_image_base } from '../services/TMDB_API'
import { MovieSection } from "../components/MovieSection";
import ViewModal from "../components/ViewModal";

export default function Home() {
    const [trending, setTrending] = useState<MovieIF[] | []>([])
    const [topRated, setTopRated] = useState<MovieIF[] | []>([]);
    const [tvSeries, setTVSeries] = useState<MovieIF[] | []>([]);
    const [animeList, setAnimeList] = useState<MovieIF[] | []>([]);


    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const { setViewData } = useContext(ViewContext);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);

            console.log("asd");

            try {
                const [
                    trendingData,
                    topRatedData,
                    tvSeriesData,
                    animeData
                ] = await Promise.all([
                    fetchTrending(),
                    fetchTopRated(),
                    fetchTVSeries(),
                    fetchAnimeList()
                ]);

                setTrending(trendingData.results);
                setTopRated(topRatedData.results);
                setTVSeries(tvSeriesData.results);
                setAnimeList(animeData.results);
            }
            catch (error) {
                console.error("Error loading Data : ", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData();
    }, [])


    async function handleMovieClick(movie: MovieIF) {
        setViewData(movie);
        setShowModal(true);
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-900">
                <Navbar handleMovieClick={handleMovieClick} />
                <HeroSkeleton />
                <MovieSectionSkeleton />
                <MovieSectionSkeleton isVertical />
                <MovieSectionSkeleton />
                <MovieSectionSkeleton isVertical />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-900">
            <Navbar handleMovieClick={handleMovieClick} />

            {trending[0] && (
                <div className="relative h-screen">
                    <img
                        src={`${tmbd_image_base}${trending[0].backdrop_path}`}
                        alt={trending[0].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black">
                        <h2 className="text-5xl text-white font-bold mb-4">
                            {trending[0].title}
                        </h2>

                        <div className="flex items-center space-x-2 mb-4">
                            <span className="text-sm text-white">
                                {trending[0]?.release_date
                                    ? new Date(trending[0].release_date).getFullYear()
                                    : "Unknown"}
                            </span>
                            <span className="px-2 py-1 bg-gray-700 rounded text-white text-sm">
                                HD
                            </span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={
                                            star <= Math.round(trending[0].vote_average / 2)
                                                ? "text-red-500"
                                                : "text-gray-500"
                                        }
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>

                        <p className="max-w-2xl text-white mb-6">{trending[0].overview}</p>

                        <div className="flex space-x-4">
                            <button className="px-8 py-2 bg-red-600 rounded hover:bg-red-700">
                                Play
                            </button>
                            <button
                                onClick={() => handleMovieClick(trending[0])}
                                className="px-8 py-2 bg-gray-600 bg-opacity-50 rounded hover:bg-opacity-70"
                            >
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <MovieSection title="Trending Now" movies={trending.slice(1)} handleMovieClick={handleMovieClick} />
            <MovieSection title="Top Rated" movies={topRated} isVertical handleMovieClick={handleMovieClick} />
            <MovieSection title="TV Series" movies={tvSeries} handleMovieClick={handleMovieClick} />
            <MovieSection title="Anime" movies={animeList} isVertical handleMovieClick={handleMovieClick} />

            {showModal && (
                <ViewModal
                    imageBase={tmbd_image_base}
                    setShowModal={setShowModal}
                />
            )}
        </div>
    )
}