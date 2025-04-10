import { MovieIF } from "../Interface/Interface";

export type MovieType = {
    title : string;
    movies : MovieIF[];
    isVertical? : boolean
    handleMovieClick: (data : MovieIF) => void;
}