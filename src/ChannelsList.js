import React, { Component } from 'react';
import { getLiveStreamersData, getStreamersUserData } from './twitch.api.js'

export class ChannelsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      streamers: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
      streamersUserData: [],
      streamingData: [],
      streamersList: []
    }
  }

  componentWillMount() {

    getStreamersUserData(this.state.streamers)
      .map((responseObj, i) => responseObj.then(response => {
        this.setState((prevState, props) => ({
          streamersUserData: [
            ...prevState.streamersUserData,
            response
          ]
        }))
      }))

    getLiveStreamersData(this.state.streamers)
      .map((responseObj, i) => responseObj.then(response => {
        this.setState((prevState, props) => ({
          streamingData: [
            ...prevState.streamingData,
            response
          ]
        }))
      }))


  }

  getListOfStreamers = () => {

    let streamers = [];

    let streamersUserData = this.state.streamersUserData;
    let liveStreamersData = this.state.streamingData;

    streamersUserData.map(streamer => {
      liveStreamersData.map(liveStreamer => {
        let channelLinkBreakdown = liveStreamer._links.channel.split('/');
        if (streamer.name.toLowerCase() === channelLinkBreakdown[channelLinkBreakdown.length - 1].toLowerCase()) {
          streamers.push({
            "name": streamer.display_name,
            "logo": streamer.logo,
            "streaming": liveStreamer.stream ? liveStreamer.stream.game + ": " + liveStreamer.stream.channel.status : "offline"
          });
        }
      })
    })

    return streamers;

  }



  render() {

    let streamers = this.getListOfStreamers();

    return (
      <div>
      <div className="filter-row">

      </div>
      <table id="channels-list">
        <tbody>
          { 
            streamers.map((streamer, i) => (
            <tr className="channel-info-row">
              <td><img className="channel-logo" src={streamer.logo} /></td>
              <td>
              <div className="channel-content">
                <h2 className="channel-name">{streamer.name}</h2>
                <p>{streamer.streaming}</p>
              </div>
              </td>
            </tr>
            )) 
          }
        </tbody>
      </table>
      </div>
  )
  }
}
