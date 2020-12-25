import React, { Component } from "react";

import { getMusicWithData, getMusicAlbum } from "../utils/network_utils";

class MusicCard extends Component {
  state = {
    song_link: undefined,
    songs: undefined,
  };

  componentDidMount() {
    if (this.props.song !== undefined) {
      getMusicWithData(this.props.song.id).then((res) => {
        this.setState({
          song_link: res.data["encrypted_media_url"],
        });
      });
    } else {
      getMusicAlbum(this.props.album.id).then((res) => {
        this.setState({
          songs: res.data["songs"],
        });
      });
    }
  }

  InfoLayout = () => {
    const prop_obj =
      this.props.type === "songs" ? this.props.song : this.props.album;
    const song_title =
      prop_obj.title === undefined ? prop_obj.song : prop_obj.title;

    if (this.props.type === "songs") {
      return (
        <div className="justify-content-center">
          <div className="row justify-content-center">
            <span>
              <span className="font-weight-bold">Song Title :</span>{" "}
              {song_title}
            </span>
          </div>
          <div className="row justify-content-center">
            <span>
              <span className="font-weight-bold">Album :</span> {prop_obj.album}
            </span>
          </div>
          {prop_obj.more_info === undefined ? null : (
            <div className="row justify-content-center">
              <span>
                <span className="font-weight-bold">Primary Artists :</span>{" "}
                {prop_obj.more_info.primary_artists}
              </span>
            </div>
          )}
          <div className="row justify-content-center">
            <span>
              <span className="font-weight-bold">Singers :</span>{" "}
              {prop_obj.more_info === undefined
                ? prop_obj.singers
                : prop_obj.more_info.singers}
            </span>
          </div>
          {this.state.song_link === undefined ? null : (
            <div className="row justify-content-center mt-2">
              <a href={this.state.song_link}>
                <button className="btn btn-danger"> Download Song </button>
              </a>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="justify-content-center">
        <div className="row justify-content-center">
          <span>
            <span className="font-weight-bold">Album Title :</span>{" "}
            {prop_obj.title === undefined ? "" : prop_obj.title}
          </span>
        </div>
        <div className="row justify-content-center">
          <span>
            <span className="font-weight-bold">Music :</span> {prop_obj.music}
          </span>
        </div>{" "}
        {this.state.songs === undefined ? null : (
          <div className="row justify-content-center mt-2">
            <button
              className="btn btn-danger"
              data-toggle="modal"
              data-target={`#album${this.props.album.id}`}
            >
              {" "}
              View Songs{" "}
            </button>
          </div>
        )}
      </div>
    );
  };

  SongsModal = () => {
    if (this.state.songs !== undefined) {
      const albumid = `album${this.props.album.id}`;
      const title = this.props.album.title;
      return (
        <div
          className="modal fade"
          id={albumid}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={`#${albumid}-title`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${albumid}-title`}>
                  {title}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" background={{}}>
                <div className="row"></div>
                {this.state.songs.map((e) => {
                  return (
                    <div className="col">
                      <MusicCard song={e} Key={e.id} type="songs" />
                      <br />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div
        className="border-black Br-10px elevated-card grey-bg p-2"
        style={{
          background: "rgba(0, 0, 0, 0.03)",
        }}
      >
        <this.SongsModal />
        <div className="row p-3">
          <div className="col-lg-4 col-sm-6 p-2">
            <img
              className="Br-10px"
              src={this.getImageUrl()}
              alt={
                this.props.song === undefined
                  ? this.props.album.title
                  : this.props.song.title
              }
              style={{
                height: "8em",
                width: "8em",
              }}
            ></img>
          </div>
          <div className="col-lg-8 col-sm-6 align-content-start">
            <this.InfoLayout />
          </div>
        </div>
      </div>
    );
  }

  getImageUrl = () => {
    const imageUrl =
      this.props.song === undefined
        ? this.props.album.image.toString()
        : this.props.song.image.toString();
    if (imageUrl.includes("150")) {
      return imageUrl.replaceAll("150", "500");
    }
    return imageUrl.replaceAll("50", "500");
  };
}

export default MusicCard;
