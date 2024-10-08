import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/Provider/ProviderContext";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const FeatureCard = ({ item }) => {
   useEffect(() => {
     AOS.init({
       duration: 1000, // You can also configure AOS here
     });
   }, []);
  const { User } = useContext(AuthContext);
  const { title, description, marks, _id, difficulty, thumbnailURL, dueDate } =
    item;
  return (
    <div data-aos="fade-up-left"  className="card bg-base-100 shadow-xl overflow-hidden">
      <figure>
        <img src={thumbnailURL} alt="image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary w-[200px]">Mark :{marks}</div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <div className="badge bagde-otuline bg-purple-200">{dueDate}</div>
          <div className="badge bagde-otuline bg-purple-400">{difficulty}</div>
        </div>
        <div className="flex items-end">
          {User? 
          (<Link to={`/assignments/${_id}`}>
            {""}
            <button className="btn btn-secondary bg-blue-400 text-end text-white text-base">
              view
            </button>
          </Link>)
          :
          (<Link to={`/login`}>
            <button className="btn btn-secondary bg-blue-400 text-white text-base text-end"> 
              view
            </button>
          </Link>)}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
