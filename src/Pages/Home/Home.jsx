import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import BannerSection from "../BannerSection/BannerSection";
import Features from "../Features/Features";
import FreqQuestions from "../FreqQuestions/FreqQuestions";

const Home = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <Navbar></Navbar>
            <BannerSection></BannerSection>
            <Features></Features>
            <FreqQuestions></FreqQuestions>
            <Footer></Footer>
        </div>
    );
};

export default Home;