import axios from "axios";

export const tmbd_api_key = "3b1d12f8383b81451e93f4a1194f12f1";
export const tmbd_base_url = "https://api.themoviedb.org/3";
export const tmbd_image_base = "https://image.tmdb.org/t/p/original";


export async function fetchTrending() {
    try {
        const response = await axios.get(`${tmbd_base_url}/trending/all/week?&api_key=${tmbd_api_key}`);
        console.log("Trending : ",response.data);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error("Error Fetching Tranding Movies")
        }
    }
}

export async function fetchTopRated() {
    try {
        const response = await axios.get(`${tmbd_base_url}/movie/top_rated?api_key=${tmbd_api_key}`);
        console.log("Top Rated : ",response.data);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error("Error Fetching Top Rated Movies")
        }
    }
}


export async function fetchTVSeries() {
    try {
        const response = await axios.get(
            `${tmbd_base_url}/tv/popular?api_key=${tmbd_api_key}`
        );
        console.log("TV Series : ",response.data);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Error fetching TV series");
        }
    }
};

export async function fetchAnimeList() {
    try {
        const response = await axios.get(`${tmbd_base_url}/discover/tv?with_genres=16&api_key=${tmbd_api_key}`);
        console.log("Anime : ",response.data);

        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('Error fetching Anime List');
        }
    }
}

export async function fetchVideo(id: number | undefined, type: string = "movie") {
    try {
        const response = await axios.get(`${tmbd_base_url}/${type}/${id}/videos?api_key=${tmbd_api_key}`);
        const trailer = response.data.results.find((vid: any) => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser'));
        if (trailer) {
            return trailer.key;
        } else {
            return null;
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(`Error fetching video for movie ${id}`);
        }
    }
};


export const searchMovies = async (query: string) => {
    try {
        const response = await axios.get(`${tmbd_base_url}/search/movie?api_key=${tmbd_api_key}&query=${query}`);
        console.log("Searching : ",response.data);

        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Error searching for movies");
        }
    }
};