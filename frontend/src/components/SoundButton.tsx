import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import "../css/SoundButton.css"

const SoundButton = () => {

    const [isMuted, setIsMuted] = useState<boolean>(true);

    const handleClick = () => {
        const video = document.getElementById("background-video") as HTMLVideoElement;
        video!.muted = !video?.muted
        setIsMuted(!isMuted);
    }
  return (
    <button id="sound-button" className="toggle-sound" onClick={handleClick}>{isMuted? <FontAwesomeIcon icon={faVolumeUp} />:<FontAwesomeIcon icon={faVolumeXmark}/>}</button>
  )
}

export default SoundButton