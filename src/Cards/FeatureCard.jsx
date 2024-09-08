const FeatureCard = ({item}) => {
    const {
    title,
    description,
    level,
    deadline,
    totalMark
    }=item;
    return (
      <div className="card bg-base-100  shadow-xl">
        <figure>
          <img src="https://i.ibb.co.com/f8JCWYL/banner2.jpg" alt="image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary w-[200px]">
              Mark :{totalMark}
            </div>
          </h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline bg-purple-200">{deadline}</div>
            <div className="badge badge-outline bg-red-400">{level}</div>
          </div>
          <div className="flex items-end">
            <button className="btn btn-secondary bg-blue-400 text-end text-white text-base ">
              view
            </button>
          </div>
        </div>
      </div>
    );
};

export default FeatureCard;