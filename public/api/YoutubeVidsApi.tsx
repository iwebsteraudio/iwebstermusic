declare function require(name: string);
const YtApiKey = require("./YoutubeApiKey");

export function GetYtVideos(): Promise<void | {}> {
  const apiKey = YtApiKey;

  return fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=${apiKey}`
  )
    .then((data) => data)
    .then((list) => console.log(list));
}
