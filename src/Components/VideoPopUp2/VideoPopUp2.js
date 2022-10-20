import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import "./VideoPopUp2.css";

export default function VideoPopUp2W(props) {
    const [modal, setModal] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);
  
    const openModal = () => {
      setModal(!modal);
    };
  
    const spinner = () => {
      setVideoLoading(!videoLoading);
    };
  
    return (
      <div className="">
        <button className="fa fa-play button-round" onClick={openModal}>
            {/* <img width={40} src="https://toppng.com/uploads/preview/lay-icon-play-icon-11563266312mklxafh8gy.png" alt=""/> */}
        </button>
        {modal ? (
            <section className="modal__bg">
              <div className="modal__align">
                <div className="modal__content" modal={modal}>
                  <IoCloseOutline
                    className="modal__close"
                    arial-label="Close modal"
                    onClick={openModal}
                  />
                  <div className="modal__video-align">
                    {videoLoading ? (
                      <div className="modal__spinner">
                        <BiLoaderAlt
                          className="modal__spinner-style"
                          fadein="none"
                        />
                      </div>
                    ) : null}
                    <iframe
                      className="modal__video-style"
                      onLoad={spinner}
                      loading="lazy"
                      width="800"
                      height="500"
                      src={props.link.replace('watch?v=','embed/')}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
          ) : null}
      </div>
    );
}
