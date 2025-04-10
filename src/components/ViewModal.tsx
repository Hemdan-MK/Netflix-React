import { useContext, useEffect, useState } from "react";
import { Genres, propsModalIF } from "../Interface/Interface";
import { ViewContext } from "../context/MovieContext";
import { fetchVideo, tmbd_api_key, tmbd_base_url } from "../services/TMDB_API";

export default function ViewModal({ imageBase, setShowModal }: propsModalIF) {
    const viewContext = useContext(ViewContext);
    const { viewData } = viewContext;

    const [videoKey, setVideoKey] = useState<string | null>(null);
    const [isPlayingTrailer, setIsPlayingTrailer] = useState<boolean>(false);

    const [genres, setGenres] = useState<Genres[]>([]);

    useEffect(() => {
        async function fetchGenre() {
            try {
                const res = await fetch(`${tmbd_base_url}/genre/movie/list?api_key=${tmbd_api_key}&language=en-US`);
                const data = await res.json();
                setGenres(data.genres)
            } catch (error) {
                console.error('Error Fetching Genres : ', error)
            }
        }

        fetchGenre()
    }, [])


    useEffect(() => {
        async function getTrailerVideo() {
            try {
                const key = await fetchVideo(viewData?.id)
                setVideoKey(key)
            } catch (error) {
                console.log(error);
            }
        };

        getTrailerVideo();
    }, [viewData?.id]);


    function handleCloseVideo() {
        setIsPlayingTrailer(false);
    }



    return (
        <>
            <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur bg-opacity-80">
                <div className="relative max-w-7xl mx-auto mt-10 w-250">
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute right-4 top-4 text-white text-4xl z-10"
                    >
                        ×
                    </button>

                    <div className="bg-zinc-900 rounded-lg overflow-hidden">
                        {isPlayingTrailer && videoKey ? (
                            <div className="relative h-[500px]">
                                <button
                                    onClick={handleCloseVideo}
                                    className="absolute right-4 top-4 text-white text-4xl z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                                >
                                    ×
                                </button>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                                    className="w-full h-full"
                                    title="Trailer"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <div className="relative h-[500px]">
                                <img
                                    src={`${imageBase}${viewData?.backdrop_path}`}
                                    alt={viewData?.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900" />
                                <div className="absolute bottom-0 left-0 p-12">
                                    <h2 className="text-white text-5xl font-bold mb-6">
                                        {viewData?.title}
                                    </h2>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-green-500">
                                            {viewData?.release_date ? new Date(viewData.release_date).getFullYear() : "Unknown"}
                                        </span>
                                        <span className="text-white border px-2 py-1 text-sm">
                                            {viewData?.adult ? "18+" : "PG-13"}
                                        </span>
                                        <span className="text-white">
                                            {viewData?.vote_average}
                                        </span>
                                        <span className="text-white bg-red-600 px-2 py-1 rounded text-sm">
                                            HD
                                        </span>
                                    </div>
                                    <p className="text-white text-lg max-w-2xl mb-8">
                                        {viewData?.overview}
                                    </p>
                                    <div className="flex gap-4">
                                        {videoKey && (
                                            <button
                                                onClick={() => setIsPlayingTrailer(true)}
                                                className="bg-red-500 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-80"
                                            >
                                                Watch Trailer
                                            </button>
                                        )}
                                        <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-opacity-80">
                                            Play
                                        </button>
                                        <button className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:bg-opacity-20">
                                            Add to My List
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="p-12">
                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <span className="text-gray-400">Genres:</span>
                                    <span className="text-white ml-2">
                                        {viewData?.genre_ids
                                            .map(id => genres.find(gen => gen.id === id)?.name)
                                            .filter(Boolean)
                                            .join(" , ")}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Original language:</span>
                                    <span className="text-white ml-2">
                                        {viewData?.original_language.toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Total votes:</span>
                                    <span className="text-white ml-2">
                                        {viewData?.vote_count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}