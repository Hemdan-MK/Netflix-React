import { tmbd_image_base } from "../services/TMDB_API";
import { MovieType } from "../types/MovieType";


export function MovieSection({ title, movies, isVertical = false, handleMovieClick }: MovieType) {
    return (
        <div className="relative mt-8 px-12 z-10">
            <h2 className="text-white text-2xl font-bold mb-6">{title}</h2>
            <div
                className={
                    isVertical
                        ? "grid grid-cols-4 gap-4"
                        : "flex overflow-x-scroll space-x-4 pb-4"
                }
            >
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => handleMovieClick(movie)}
                        className={`
                    relative group cursor-pointer 
                    ${isVertical ? "w-full" : "flex-shrink-0 w-64"}
                    `}
                    >
                        <img
                            src={`${tmbd_image_base}${isVertical ? movie.poster_path : movie.backdrop_path
                                }`}
                            alt={movie.title}
                            className={`
                        w-full rounded 
                        transition-transform duration-300 
                        group-hover:scale-110
                        ${isVertical ? "h-96 object-cover" : "h-36 object-cover"}
                    `}
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    </div>
                ))}
            </div>
        </div>
    )
}