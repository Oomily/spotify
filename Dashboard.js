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
  const [artistsList2, setArtistsList2] = useState([]);
  const [artistsList3, setArtistsList3] = useState([]);

  const [tracksList, setTracksList] = useState([]);
  const [tracksList2, setTracksList2] = useState([]);
  const [tracksList3, setTracksList3] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    // Setting Up the spotifyApi with AccessToken so that we can use its functions anywhere in the component without setting AccessToken value again & again. 
    spotifyApi.setAccessToken(accessToken);

    // Get user details with help of getMe() function
    spotifyApi.getMe().then(data => {
      console.log(data);
      if(typeof data !== "undefined" && data.body !== "undefined")      
        setuserID(data.body.display_name);
    })

    /* Get a User’s Top Artists Short Term*/
    spotifyApi.getMyTopArtists({time_range:'short_term'})
    .then(function(data) {
    let topArtists = data.body.items;
    console.log(topArtists);
    try{
    setArtistsList([{name: topArtists[0].name, pic: topArtists[0].images[0].url, url: topArtists[0].external_urls.spotify}, 
      {name: topArtists[1].name, pic: topArtists[1].images[0].url, url: topArtists[1].external_urls.spotify},
      {name: topArtists[2].name, pic: topArtists[2].images[0].url, url: topArtists[2].external_urls.spotify}]);
}
    catch(error){}
    }, function(err) {
    console.log('Something went wrong!', err);
    });

    /* Get a User’s Top Artists Medium Term*/
    spotifyApi.getMyTopArtists({time_range:'medium_term'})
    .then(function(data) {
    let topArtists = data.body.items;
    console.log(topArtists);
    try{
    setArtistsList2([{name: topArtists[0].name, pic: topArtists[0].images[0].url, url: topArtists[0].external_urls.spotify}, 
      {name: topArtists[1].name, pic: topArtists[1].images[0].url, url: topArtists[1].external_urls.spotify},
      {name: topArtists[2].name, pic: topArtists[2].images[0].url, url: topArtists[2].external_urls.spotify}]);
}
    catch(error){}
    }, function(err) {
    console.log('Something went wrong!', err);
    });   

    /* Get a User’s Top Artists Long Term*/
    spotifyApi.getMyTopArtists({time_range:'long_term'})
    .then(function(data) {
    let topArtists = data.body.items;
    console.log(topArtists);
    try{
    setArtistsList3([{name: topArtists[0].name, pic: topArtists[0].images[0].url, url: topArtists[0].external_urls.spotify}, 
                     {name: topArtists[1].name, pic: topArtists[1].images[0].url, url: topArtists[1].external_urls.spotify},
                     {name: topArtists[2].name, pic: topArtists[2].images[0].url, url: topArtists[2].external_urls.spotify}]);
    }
    catch(error){}
    }, function(err) {
    console.log('Something went wrong!', err);
    });   

    /* Get a User’s Top Tracks short term*/
    spotifyApi.getMyTopTracks({time_range:'short_term'})
    .then(function(data) {
    let topTracks = data.body.items;
    console.log(topTracks);
    try{
      setTracksList([
        {name: topTracks[0].name, pic: topTracks[0].album.images[0].url, url: topTracks[0].album.external_urls.spotify, artist: topTracks[0].artists[0].name}, 
        {name: topTracks[1].name, pic: topTracks[1].album.images[0].url, url: topTracks[1].album.external_urls.spotify, artist: topTracks[1].artists[0].name}, 
        {name: topTracks[2].name, pic: topTracks[2].album.images[0].url, url: topTracks[2].album.external_urls.spotify, artist: topTracks[2].artists[0].name}, 
        {name: topTracks[3].name, pic: topTracks[3].album.images[0].url, url: topTracks[3].album.external_urls.spotify, artist: topTracks[3].artists[0].name},
        {name: topTracks[4].name, pic: topTracks[4].album.images[0].url, url: topTracks[4].album.external_urls.spotify, artist: topTracks[4].artists[0].name},
        {name: topTracks[5].name, pic: topTracks[5].album.images[0].url, url: topTracks[5].album.external_urls.spotify, artist: topTracks[5].artists[0].name}]);
    }catch(error){
      //empty
    }
    }, function(err) {
    console.log('Something went wrong!', err);
    });


    /* Get a User’s Top Tracks medium term*/
    spotifyApi.getMyTopTracks({time_range:'medium_term'})
    .then(function(data) {
    let topTracks = data.body.items;
    console.log(topTracks);
    try{
      setTracksList2([
        {name: topTracks[0].name, pic: topTracks[0].album.images[0].url, url: topTracks[0].album.external_urls.spotify, artist: topTracks[0].artists[0].name}, 
        {name: topTracks[1].name, pic: topTracks[1].album.images[0].url, url: topTracks[1].album.external_urls.spotify, artist: topTracks[1].artists[0].name}, 
        {name: topTracks[2].name, pic: topTracks[2].album.images[0].url, url: topTracks[2].album.external_urls.spotify, artist: topTracks[2].artists[0].name}, 
        {name: topTracks[3].name, pic: topTracks[3].album.images[0].url, url: topTracks[3].album.external_urls.spotify, artist: topTracks[3].artists[0].name},
        {name: topTracks[4].name, pic: topTracks[4].album.images[0].url, url: topTracks[4].album.external_urls.spotify, artist: topTracks[4].artists[0].name},
        {name: topTracks[5].name, pic: topTracks[5].album.images[0].url, url: topTracks[5].album.external_urls.spotify, artist: topTracks[5].artists[0].name}]);
    }catch(error){
      //empty
    }
    }, function(err) {
    console.log('Something went wrong!', err);
    });
  
      /* Get a User’s Top Tracks long term*/
      spotifyApi.getMyTopTracks({time_range:'long_term'})
      .then(function(data) {
      let topTracks = data.body.items;
      console.log(topTracks);
      try{
        setTracksList3([
          {name: topTracks[0].name, pic: topTracks[0].album.images[0].url, url: topTracks[0].album.external_urls.spotify, artist: topTracks[0].artists[0].name}, 
          {name: topTracks[1].name, pic: topTracks[1].album.images[0].url, url: topTracks[1].album.external_urls.spotify, artist: topTracks[1].artists[0].name}, 
          {name: topTracks[2].name, pic: topTracks[2].album.images[0].url, url: topTracks[2].album.external_urls.spotify, artist: topTracks[2].artists[0].name}, 
          {name: topTracks[3].name, pic: topTracks[3].album.images[0].url, url: topTracks[3].album.external_urls.spotify, artist: topTracks[3].artists[0].name},
          {name: topTracks[4].name, pic: topTracks[4].album.images[0].url, url: topTracks[4].album.external_urls.spotify, artist: topTracks[4].artists[0].name},
          {name: topTracks[5].name, pic: topTracks[5].album.images[0].url, url: topTracks[5].album.external_urls.spotify, artist: topTracks[5].artists[0].name}]);
      }catch(error){
        //empty
      }
      }, function(err) {
      console.log('Something went wrong!', err);
      });
      

  }, [accessToken]);

  return (
    <div class="container" style={{display: "flex"}}>
        <h1><center>Welcome {userID}!</center></h1>
        <div class = "break"></div>
        <h1><center>Your Top 6 Tracks short term:</center></h1>
        <div class = "break"></div>
        {tracksList.map((track) => (<h3 key = {track.name}> 
        <Card image = {track.pic} title = {track.name} url = {track.url} desc = {track.artist}/>
        </h3>))}
        <div class = "break"></div>
        
        <h1><center>Your Top 6 Tracks medium term:</center></h1>
        <div class = "break"></div>
        {tracksList2.map((track) => (<h3 key = {track.name}> 
        <Card image = {track.pic} title = {track.name} url = {track.url} desc = {track.artist}/>
        </h3>))}
        <div class = "break"></div>

        <h1><center>Your Top 6 Tracks long term:</center></h1>
        <div class = "break"></div>
        {tracksList3.map((track) => (<h3 key = {track.name}> 
        <Card image = {track.pic} title = {track.name} url = {track.url} desc = {track.artist}/>
        </h3>))}
        <div class = "break"></div>
        <h1><center>Your Top 3 Artists short term:</center></h1>
        <div class = "break"></div>
        {artistsList.map((artist) => (<h3 key = {artist.name}>
        <Card image = {artist.pic} title = {artist.name} url = {artist.url}/>
        </h3>))}
        <div class = "break"></div>

        <h1><center>Your Top 3 Artists medium term:</center></h1>
        <div class = "break"></div>
        {artistsList2.map((artist) => (<h3 key = {artist.name}> 
        <Card image = {artist.pic} title = {artist.name} url = {artist.url}/>
        </h3>))}
        <div class = "break"></div>

        <h1><center>Your Top 3 Artists long term:</center></h1>
        <div class = "break"></div>
        {artistsList3.map((artist) => (<h3 key = {artist.name}> 
        <Card image = {artist.pic} title = {artist.name} url = {artist.url}/>
        </h3>))}
        <div class = "break"></div>
    </div>
  );
};

export default Dashboard;
