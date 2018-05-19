import React from 'react'

export const getLiveStreamersData = (streamers) => streamers.map(streamer => request("https://wind-bow.glitch.me/twitch-api/streams/" + streamer))

export const getStreamersUserData = (streamers) => streamers.map(streamer => request("https://wind-bow.glitch.me/twitch-api/users/" + streamer))

const request = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json; // returns Promise containing data
}
