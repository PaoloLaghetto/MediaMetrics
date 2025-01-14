import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/MediaMetrics-logo.png";
import axios from "axios";
import SocialBlade from "socialblade";
import { google } from "googleapis";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const YOUTUBE_API_KEY = "AIzaSyD8XMeZdKRFjIb650MKRrsEKxO-9uTCZXQ"; // Replace with your API key
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos";
// ID client
export const clientId =
  "382783952065-ei4m9s60qk8872spcb7qml7g8ogf764g.apps.googleusercontent.com";
import { gapi } from "gapi-script";
// const SOCIALBLADE_API_URL = "https://matrix.sbapis.com/b/YouTube/top";
/*const SOCIALBLADE_CLIENT_ID = "cli_824fa16cc5b817d5608b8958";
const SOCIALBLADE_ACCESS_TOKEN =
  "9e0c8738e2d97350570f39543774e556bb63ede032211a5b5892351490a441a125b104d4f829df270f56db05275f52368fadddb0992892f5f3e49e64f9db6683";

function AppTest() {
  const [mostViewedVideo, setMostViewedVideo] = useState(null);
  const [list, setList] = useState([]);

  const client: SocialBlade = new SocialBlade(
    SOCIALBLADE_CLIENT_ID,
    SOCIALBLADE_ACCESS_TOKEN
  );

  useEffect(() => {
    axios
      .get(YOUTUBE_API_URL, {
        params: {
          /!*          chart: "mostPopular",
          part: "snippet,statistics",
          mine: false,
          maxResults: 5, // Get only 5 channels
          regionCode: "IT", // Specify Italy as the region
          key: YOUTUBE_API_KEY,*!/
          /!*          part: "snippet,statistics",
          chart: "mostPopular",
          maxResults: 10,
          key: YOUTUBE_API_KEY,*!/
          part: "snippet,statistics", // Get video details and statistics
          chart: "mostPopular", // Request most popular videos
          regionCode: "IT", // Specify a region (e.g., 'US')
          maxResults: 1, // Get only 1 video
          key: YOUTUBE_API_KEY,
        },
      })
      .then((response) => {
        if (response.data.items.length > 0) {
          setMostViewedVideo(response.data.items[0]);
          setList(response.data.items);
        }
      })
      .catch((error) => {
        console.error("Error fetching the most viewed video:", error);
      });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">MediaMetrics</h1>
      <div>
        <ul>
          {list.map((video) => (
            <li key={video.id}>
              <h2>Title: {video.snippet.title}</h2>
              <p>Views: {video.statistics.viewCount}</p>
              <iframe
                width="560"
                height="315"
                className={"m-auto"}
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
          ))}
        </ul>
        {/!*        {mostViewedVideo && (
          <>
            <h2>{mostViewedVideo.snippet.title}</h2>
            <p>{mostViewedVideo.snippet.description}</p>
            <p>Views: {mostViewedVideo.statistics.viewCount}</p>
            <iframe
              width="560"
              height="315"
              className={"m-auto"}
              src={`https://www.youtube.com/embed/${mostViewedVideo.id}`}
              title={mostViewedVideo.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </>
        )}*!/}
      </div>
    </>
  );
}*/

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope:
          "https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/youtube.readonly",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  function authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(
        () => {
          console.log("Sign-in successful");
        },
        (err) => {
          console.error("Error signing in", err);
        }
      );
  }

  function loadClient() {
    return gapi.client
      .load(
        "https://youtubeanalytics.googleapis.com/$discovery/rest?version=v2"
      )
      .then(
        () => {
          console.log("GAPI client loaded for API");
        },
        (err) => {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }

  function execute() {
    return gapi.client.youtubeAnalytics.reports
      .query({
        ids: "channel==MINE",
        startDate: "2017-01-01",
        endDate: "2017-12-31",
        metrics:
          "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",
        dimensions: "day",
        sort: "day",
      })
      .then(
        (response) => {
          console.log("Response", response);
        },
        (err) => {
          console.error("Execute error", err);
        }
      );
  }

  return (
    <>
      <div className="flex h-screen w-screen gap-4 flex-col items-center justify-center">
        <img src={logo} alt="App Logo" className="max-w-[150px]"></img>
        <div className="flex flex-col gap-2 mt-10">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => authenticate().then(loadClient)}
          >
            authorize and load
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={execute}
          >
            execute
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
