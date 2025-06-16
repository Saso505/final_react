
/* eslint-disable */

import React from "react";

export default function Feature() {
  return (
    <>
      <div id="Feature" className="feature py-12 ">
        <div className="head flex justify-center items-center flex-col text-center py-2">
          <span className="text-slate-100 tex-sm">Feature</span>
          <h2 className="font-Abril text-slate-100  text-5xl">
            What We <span className="text-[#A964BA]">Do</span>
          </h2>
          <div className="mt-3 w-20 h-1 mx-auto bg-white rounded"></div>
          <span className="text-slate-100 tex-sm w-3/4 py-5">
            our project seeks to create an automated system that leverages deep
            learning to accurately detect deceptive behavior by analyzing
            nonverbal cues, including facial expressions, vocal tone, and gaze
            direction, combining these modalities to improve detection accuracy.
          </span>
        </div>

        <div className="grid w-3/4 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {/* Feature Item */}
          <div className="bg-white text-[#db77f6] shadow-md rounded-lg py-10 text-center text-lg font-medium">
            Ui/Ux
          </div>
          <div className="bg-[#D9D9D9]/20  text-slate-100    shadow-md rounded-lg py-10 text-center text-lg font-medium">
            Front-End
          </div>
          <div className="bg-white text-[#db77f6] shadow-md rounded-lg py-10 text-center text-lg font-medium">
            Ai
          </div>
          <div className="bg-[#D9D9D9]/20    text-slate-100   shadow-md rounded-lg py-10 text-center text-lg font-medium">
            Hardware
          </div>
        </div>
      </div>
    </>
  );
}
