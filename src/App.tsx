import "./App.css";
import logo from "./assets/MediaMetrics-logo.png";

// ID client
/*
export const clientId =
  "382783952065-ei4m9s60qk8872spcb7qml7g8ogf764g.apps.googleusercontent.com";
 */

function App() {
  /*  useEffect(() => {
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
    return gapi.client?.youtubeAnalytics?.reports
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
  }*/

  return (
    <>
      <div className="flex h-screen w-screen gap-4 flex-col items-center justify-center">
        <img src={logo} alt="App Logo" className="max-w-[150px]"></img>
        {/*        <div className="flex flex-col gap-2 mt-10">
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
        </div>*/}
      </div>
    </>
  );
}

export default App;
