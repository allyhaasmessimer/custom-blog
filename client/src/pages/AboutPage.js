import Headshot from "../images/PLACEHOLDER_HS.jpg";
import "../AboutPage.css";

export default function AboutPage() {
    return (
        <div className="about_container">
            <div>
                <h1>Welcome! </h1>
                <br />
                <h2>I’m thrilled you’re here. </h2>
                <h2>
                    I’m Liesel Schmidt—a wordsmith captivated by stories waiting
                    to be told.{" "}
                </h2>
                <br />
                <p>
                    For years, I've explored the world through the lens of a
                    writer, chronicling adventures from the bustling streets of
                    Arlington, VA, to the serene landscapes of Germany. Whether
                    penning freelance articles, weaving narratives for
                    magazines, or crafting compelling novels, I thrive on
                    capturing the essence of life's myriad tales.{" "}
                </p>
                <br />
                <p>
                    I've always been drawn to the rhythm of running and the
                    allure of new places, or circling back to visit my favorite
                    places. With multiple jobs and an insatiable curiosity, I'm
                    constantly in motion, delving into diverse subjects and
                    conducting research to uncover stories that resonate.
                    Looking back on life's trials, laughter has been my
                    unexpected companion. When uncertainty lingers, laughter
                    becomes my compass—a beacon of joy that knows no bounds.
                </p>
                <br />
                <p>
                    Join me as we uncover stories, explore new horizons, and
                    celebrate the journey of life through words.
                </p>
            </div>
            <div className="image-headshot">
                <img src={Headshot} alt="liesel_schmidt_headshot" />
            </div>
        </div>
    );
}
