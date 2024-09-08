import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import BannerSection from "../BannerSection/BannerSection";

const Home = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <Navbar></Navbar>
            <BannerSection></BannerSection>
            <Footer></Footer>
        </div>
    );
};

export default Home;