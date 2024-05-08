import React from "react"

export default function Player() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#181818] p-2 flex justify-between items-center">
      <div>
        <i className="fa fa-play text-white text-xl"></i>
      </div>
      <div>
        <p className="text-white">Now Playing: Song 1 - Artist 1</p>
      </div>
      <div>
        <i className="fa fa-forward text-white text-xl"></i>
      </div>
    </div>
  )
}
