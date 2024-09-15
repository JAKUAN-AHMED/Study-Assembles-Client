import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/Provider/ProviderContext";

const FeatureCard = ({item}) => {
  const {User}=useContext(AuthContext);
    const { title, description, marks, difficulty, thumbnailURL, dueDate,_id } =
      item;
    return (
      <div className="card bg-base-100  shadow-xl">
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
            <div className="badge badge-outline bg-purple-200">{dueDate}</div>
            <div className="badge badge-outline bg-red-400">{difficulty}</div>
          </div>
          <div className="flex items-end">
            {User ? (
              <Link to={`/assignments/${_id}`}>
                {" "}
                <button className="btn btn-secondary bg-blue-400 text-end text-white text-base ">
                  view
                </button>
              </Link>
            ) : (
              <Link to={`/login`}>
                {" "}
                <button className="btn btn-secondary bg-blue-400 text-end text-white text-base ">
                  view
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
};

export default FeatureCard;