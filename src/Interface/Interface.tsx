
export interface MovieIF {
    id: number;
    title: string;
    overview: string;
    release_date?: string | number | Date;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult?: boolean;
    genre_ids: number[];
    original_language: string;
}

export interface Genres {
    id : number;
    name : string
}


export interface ContextIF {
    viewData: MovieIF | undefined;
    setViewData: (data: MovieIF) => void
}


export interface propsModalIF {
    imageBase: string;
    setShowModal: (val: boolean) => void;
}