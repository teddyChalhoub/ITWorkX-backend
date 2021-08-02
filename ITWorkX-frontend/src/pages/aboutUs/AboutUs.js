import React from "react";
import "./AboutUs.css";
import logo from "./logo.png";
import TeamSection from "../../components/teamSection/TeamSection";
import PrimaryFooter from "../../components/primaryFooter/PrimaryFooter";

export default function aboutUs() {
  return (
    <>
      <div className="container__aboutUs">
        <div className="first-para">
          <h1>About the company</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac
            elementum ipsum. Ut ut neque purus. Duis congue, neque eget finibus
            molestie, justo ipsum porttitor lorem, eget tempus elit nibh ut
            ipsum. Pellentesque mattis quam a dui tincidunt, in varius magna
            lobortis. Donec tristique augue lorem, nec euismod odio facilisis
            at. Sed erat nunc, venenatis nec felis sit amet, placerat semper
            nibh. In venenatis lorem quis metus elementum, et gravida mauris
            ornare. Morbi consequat risus eros, nec aliquet ex lobortis ac.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac
            elementum ipsum. Ut ut neque purus. Duis congue, neque eget finibus
            molestie, justo ipsum porttitor lorem, eget tempus elit nibh ut
            ipsum. Pellentesque mattis quam a dui tincidunt, in varius magna
            lobortis. Donec tristique augue lorem, nec euismod odio facilisis
            at. Sed erat nunc, venenatis nec felis sit amet, placerat semper
            nibh. In venenatis lorem quis metus elementum, et gravida mauris
            ornare. Morbi consequat risus eros, nec aliquet ex lobortis ac.
          </p>
        </div>
        <div className="second-para">
          <div className="container-second">
            <div className="image-second left">
              <img src={logo} alt="logo" />
            </div>
            <div className="text-second">
              <h1>Who we are ?</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent ac elementum ipsum. Ut ut neque purus. Duis congue,
                neque eget finibus molestie, justo ipsum porttitor lorem, eget
                tempus elit nibh ut ipsum. Pellentesque mattis quam a dui
                tincidunt, in varius magna lobortis. Donec tristique augue
                lorem, nec euismod odio facilisis at. Sed erat nunc, venenatis
                nec felis sit amet, placerat semper nibh. In venenatis lorem
                quis metus elementum, et gravida mauris ornare. Morbi consequat
                risus eros, nec aliquet ex lobortis ac. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Praesent ac elementum ipsum.
                Ut ut neque purus. Duis congue, neque eget finibus molestie,
                justo ipsum porttitor lorem, eget tempus
              </p>
            </div>
          </div>
        </div>
        <div className="components">
          <TeamSection />
          <TeamSection />
          <TeamSection />
          <TeamSection />
        </div>
        <div className="fourth-para">
          <div className="container-second ">
            <div className="text-second">
              <h1>Who we are ?</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent ac elementum ipsum. Ut ut neque purus. Duis congue,
                neque eget finibus molestie, justo ipsum porttitor lorem, eget
                tempus elit nibh ut ipsum. Pellentesque mattis quam a dui
                tincidunt, in varius magna lobortis. Donec tristique augue
                lorem, nec euismod odio facilisis at. Sed erat nunc, venenatis
                nec felis sit amet, placerat semper nibh. In venenatis lorem
                quis metus elementum, et gravida mauris ornare. Morbi consequat
                risus eros, nec aliquet ex lobortis ac. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Praesent ac elementum ipsum.
                Ut ut neque purus. Duis congue, neque eget finibus molestie,
                justo ipsum porttitor lorem, eget tempus
              </p>
            </div>
            <div className="image-second right">
              <img src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div>

      <PrimaryFooter />
    </>
  );
}
