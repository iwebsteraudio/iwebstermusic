export function GetYtVideos(): Promise<void | {}> {
  const apiKey = "AIzaSyAddfIV-Uc7zs0omeEtdUUcOFDN80m1s3M";
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=${apiKey}`
  )
    .then((data) => data)
    .then((list) => console.log(list));
}
