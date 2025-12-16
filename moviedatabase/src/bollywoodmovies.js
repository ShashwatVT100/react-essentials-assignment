import React,{useState, useMemo,useCallback} from "react";
import chennaiImage from './chen.jpeg';
import pushpaImage from './pushpa.jpeg';
import tigerImage from './tiger.jpeg';
import chessImage from './chess.jpeg'; 
import brahmImage from './brahm.jpeg';
import './bollywoodmovies.css';
const bollywoodMovies = [
    {
        id: 1,
        title: "Tiger Murda hai",
        rating: 9.1,
        genre: "Comedy",
        year: 2022,
        director: "Kapil Sharma",
        image: tigerImage, // Corrected to use imported variable
        cast: ["Ajay Devgan", "Salman Khan"],
        fav:false
    },
    {
        id: 2,
        title: "Socio-Chess",
        rating: 5.6,
        genre: "Documentary",
        year: 2024,
        director: "Bear Grills",
        // External URL is fine
        image: chessImage,
        cast: ["Slayy Point", "Levy Rozman"],
        fav:false
    },
    {
        id: 3,
        title: "Bramhastra (Behind the scenes)",
        rating: 8.5,
        genre: "Expose",
        year: 2020,
        director: "ABP news",
        // External URL is fine
        image: brahmImage,
        cast: ["Bramhastra cast", "Dealer"],
        fav:false
    },
    {
        id: 4,
        title: "Pushpa (The neck injury)",
        rating: 8.0,
        genre: "Documentary",
        year: 2023,
        director: "Apex Hospital",
        image: pushpaImage, // Corrected to use imported variable
        cast: ["Allu Arjun", "Sandlewood Dealers", "Spine specialist"],
        fav:false
    },
    {
        id: 5,
        title: "Chennai Express (Understanding Baap)",
        rating: 9.6,
        genre: "Comedy",
        year: 2022,
        director: "Family Therapist",
        image: chennaiImage, // Corrected to use imported variable
        cast: ["Psychiatrist", "Sharukh khan", "Deepika Padukone", "Rest Family"],
        fav:false
    }
];
function BollywoodHits(){
    const [loading,setLoading]=useState(false);
    const [selGenre,setSelGenre]=useState('All');
    const [movies,setMovies]=useState(bollywoodMovies);
    const [search,setSearch]=useState('');
    const [sortBy,setSortBy]=useState('title');
    const [favoriate,setFavoriate]=useState(false);
    const getCategory=(rating)=>{
        if(rating>=9.0)return 'Blockbuster';
        if(rating>=8.5)return 'Superhit';
        if(rating>=7.5)return 'Hit';
        return 'Average';
    };
    const toggleFavorite = useCallback((id) => {
        setMovies(prevMovies =>
            prevMovies.map(movie =>
                movie.id === id ? { ...movie, fav: !movie.fav } : movie
            )
        );
    }, []);
    const genres=['All', ...new Set(movies.map(movie=>movie.genre))];
    const sortfiltermov=useMemo(()=>{
        const filteredMov=movies.filter(movie=>{
        const searchLower=search.toLowerCase();
        const matchesSearch= movie.title.toLowerCase().includes(searchLower)||
        movie.genre.toLowerCase().includes(searchLower)||
        movie.director.toLowerCase().includes(searchLower)||
        movie.cast.some(actor=>actor.toLowerCase().includes(searchLower))||
        movie.year.toString().toLowerCase().includes(searchLower);
        const matchesGen=selGenre==='All'||movie.genre===selGenre;
        const favsel=favoriate?movie.fav:true;
        return matchesSearch&&matchesGen&&favsel;
    });
    return filteredMov.sort((a,b)=>{
        switch(sortBy){
            case "rating":
                return b.rating-a.rating;
            case "year":
                return b.year-a.year;
            case "genre":
                return a.genre.localeCompare(b.genre);
            case "title":
            default:
                return a.title.localeCompare(b.title);
        }
    });
    },[movies,search,selGenre,sortBy,favoriate]);
    return(
        <div className="movies">
            <h1>Bollywood Hits</h1>
            {loading?(
                <div className="loading-spinner">
                    <p>Loading Movies...</p>
                </div>
            ):(
                <div className="main-content">
                    <div className="search-section">
                        <input className="search-input" type="text" placeholder="Search bollywood movies...." value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        {search&&(
                            <div className="searchrestxt">
                                <p>
                                    {sortfiltermov.length} movie{sortfiltermov.length>1?'s':''} for "{search}"
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="filter-search">
                        <h4>Filter by Genre:</h4>
                        <div className="genre-buttons">
                            {genres.map(genre=>(
                                <button className={`genre-button ${selGenre===genre?'active':''}`} key={genre} onClick={()=>setSelGenre(genre)}>
                                    {genre}
                                </button>
                            ))}
                            <button className={`genre-button ${favoriate?'active':''}`} onClick={()=>setFavoriate(!favoriate)}>
                                    Favoriate
                                </button>
                        </div>
                    </div>
                    <div className="sort-section">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select id="sort-select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                            <option value="title">Title (A - Z)</option>
                            <option value="rating">Rating (High - Low)</option>
                            <option value="year">Year (Newest First)</option>
                            <option value="genre">Genre (A - Z)</option>
                        </select>
                    </div>
                    {
                        (search||selGenre!=='All')&&(
                            <button onClick={()=>{setSearch('');setSelGenre('All')}} className="clear-filters">Clear all filters</button>
                        )
                    }
                    <div className="grid">
                        {sortfiltermov.length>0 ?
                        (sortfiltermov.map((movie)=>(
                            <div className="movie-card">
                            <div className={`movie-card-${getCategory(movie.rating)}`} key={movie.id}>
                                <img src={movie.image} alt="Moviepic" className="movie-image"/>
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-year">{movie.year}</p>
                                <p className="movie-genre">{movie.genre}</p>
                                <p className="movie-director">Director:{movie.director}</p>
                                <div className={`rating-${getCategory(movie.rating)}`}>{movie.rating}/10</div>
                                <p className="cast">Cast: {movie.cast.join(", ")}</p>
                            </div>
                            <button
                                        onClick={() => toggleFavorite(movie.id)}
                                        className={`favoriate-button ${movie.fav ? 'favoriated' : ''}`}
                                    >
                                        {movie.fav ? '❤️ Favoriated' : '🤍 Favoriate'}
                                    </button>
                            </div>
                        ))):(
                            <div className="empty-state">
                                <h3>No movies found!</h3>
                                {
                                    search||selGenre!=='All'?"Try adjusting your search or filter criteria":"Start searching to find amazing movies!"
                                }
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
export default BollywoodHits;