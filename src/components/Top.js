import React from "react";
import titleImg from "../imgs/title.png";

import Scene from "./ThreeRenderAlt.js";
class Top extends React.Component {
  state = { rawDays: "", today: "", schoolDays: "", percentage: "" };

  componentDidMount() {
    let getInfo = function() {
      return new Promise(function(resolve, reject) {
        var today = Date.now();
        // var todayTest = new Date("10/01/2019");

        var summers = [
          new Date("06/13/2020"),
          new Date("06/13/2021"),
          new Date("06/13/2022")
        ];
        var winters = [
          new Date("12/14/2019"),
          new Date("12/14/2020"),
          new Date("12/14/2021"),
          new Date("12/14/2021")
        ];
        var springs = [
          new Date("03/21/2019"),
          new Date("03/21/2020"),
          new Date("03/21/2021"),
          new Date("03/21/2021")
        ];
        var graduation = new Date("06/15/2023");
        var rawDays = Math.trunc(
          (graduation.getTime() - today) / (1000 * 3600 * 24)
        );

        var schoolDays = rawDays * (5 / 7);
        for (var i = 3; i >= 0; i--) {
          if (today < springs[i].getTime()) {
            schoolDays = schoolDays - 5;
            if (today < winters[i].getTime()) {
              schoolDays = schoolDays - 17;
              if (i < 3 && today < summers[i].getTime()) {
                schoolDays = schoolDays - 58;
              }

              console.log("summer DETECTED");
            }
          }
        }
        //796 total amount of school days as calculated above.
        //15 79*5/7
        schoolDays = Math.trunc(schoolDays);
        var percentage = (100 - (schoolDays / 796) * 100).toFixed(2);
        var dates = {
          today: today,
          schoolDays: schoolDays,
          rawDays: rawDays,
          percentage: percentage
        };
        resolve(dates);
      });
    };
    getInfo().then(data => {
      return this.setState({
        rawDays: data.rawDays,
        today: data.today,
        schoolDays: data.schoolDays,
        percentage: data.percentage
      });
    });
  }

  render() {
    return (
      <div className="genDiv">
        <div className="stretch">
          <Scene />
        </div>
        <img className="titleImg" src={titleImg} alt="titleImg" />
        <div className="row fullHeight">
          <div className="rCol tri centerH centerV">
            <p className="numP">{this.state.rawDays}</p>
            <p className="titleP">DAYS LEFT (RAW)</p>
          </div>
          <div className=" tri centerH centerV">
            <p className="numP">{this.state.schoolDays}</p>
            <p className="titleP">SCHOOL DAYS LEFT</p>
          </div>
          <div className=" tri centerH centerV">
            <p className="numP">{this.state.percentage}%</p>
            <p className="titleP">PERCENTAGE COMPLETE</p>
          </div>
        </div>
        <div className="bottomRow centerH">
          <a href="https://twitter.com/largeeggie">
            <p className="bottomText hover">[twitter]</p>
          </a>
          <a href="https://github.com/simonmahns">
            <p className="bottomText hover">[github]</p>
          </a>
          <a href="https://github.com/simonmahns/TweetGenerator">
            <p className="bottomText hover">[code]</p>
          </a>
        </div>
      </div>
    );
  }
}

export default Top;
