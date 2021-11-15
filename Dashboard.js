import React, { useEffect , useState} from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Card from "./Card"

// Setting the spotifyApi, so that we can use it's functions
const spotifyApi = new SpotifyWebApi({
  clientId: "2963c491e44c4518a1c0c1397eff11b2",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [userID, setuserID] = useState();
  const [artistsList, setArtistsList] = useState([]);
  const [tracksList, setTracksList] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    // Setting Up the spotifyApi with AccessToken so that we can use its functions anywhere in the component without setting AccessToken value again & again. 
    spotifyApi.setAccessToken(accessToken);

    // Get user details with help of getMe() function
    spotifyApi.getMe().then(data => {
      console.log(data);
      if(typeof data !== "undefined" && typeof data.body !== "undefined")      
        setuserID(data.body.display_name);
    })

    /* Get a User’s Top Artists*/
    spotifyApi.getMyTopArtists()
    .then(function(data) {
    let topArtists = data.body.items;
    console.log(topArtists);
    try{
    setArtistsList([{name: topArtists[0].name, pic: topArtists[0].images[0].url, url: topArtists[0].external_urls.spotify}, {name: topArtists[1].name, pic: topArtists[1].images[0].url, url: topArtists[1].external_urls.spotify}, {name: topArtists[2].name, pic: topArtists[2].images[0].url, url: topArtists[2].external_urls.spotify}, {name: topArtists[3].name, pic: topArtists[3].images[0].url, url: topArtists[3].external_urls.spotify}]);
    }
    catch(error){
      //empty
    }
    }, function(err) {
    console.log('Something went wrong!', err);
    });
    

    /* Get a User’s Top Tracks*/
    spotifyApi.getMyTopTracks()
    .then(function(data) {
    let topTracks = data.body.items;
    console.log(topTracks);
    try{
      setTracksList([{name: topTracks[0].album.name, pic: topTracks[0].album.images[0].url, url: topTracks[0].album.external_urls.spotify, artist: topTracks[0].artists[0].name}, {name: topTracks[1].album.name, pic: topTracks[1].album.images[0].url, url: topTracks[1].album.external_urls.spotify, artist: topTracks[1].artists[0].name}, {name: topTracks[2].album.name, pic: topTracks[2].album.images[0].url, url: topTracks[2].album.external_urls.spotify, artist: topTracks[2].artists[0].name}, {name: topTracks[3].album.name, pic: topTracks[3].album.images[0].url, url: topTracks[3].album.external_urls.spotify, artist: topTracks[3].artists[0].name}]);
    }catch(error){
      //empty
    }
    }, function(err) {
    console.log('Something went wrong!', err);
    });
    
  }, [accessToken]);

  return (
    <div>
        <h1>Welcome {userID}!</h1>
        <h1>Your Top 6 Tracks:</h1>
        {tracksList.map((track) => (<h3 key = {track.name}> 
        <Card image = {track.pic} title = {track.name} url = {track.url} desc = {track.artist}/>
        </h3>))}

        <h1>Your Top 4 Artists:</h1>
        {artistsList.map((artist) => (<h3 key = {artist.name}> 
        <Card image = {artist.pic} title = {artist.name} url = {artist.url}/>
        </h3>))}
    
   
    </div>
  );
};

export default Dashboard;