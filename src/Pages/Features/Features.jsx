import { useEffect, useState } from "react";
import FeatureCard from "../../Cards/FeatureCard";

const Features = () => {
    const[features,setFeatures]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:9999/tasks")
          .then((res) => res.json())
          .then((data) => setFeatures(data));
    },[])
    return (
      <div className="mt-2 lg:mt-8 mb-24 overflow-hidden font-poppins">
        <div className="text-center font-poppins mb-20 mt-24 gap-y-3"> 
          <h2 className="font-bold text-2xl lg:text-4xl p-2">
            <span className="bg-purple-200">Platform</span>{" "}
            <span className="bg-blue-400">Features</span>{" "}
            <span className="bg-yellow-400">Overview</span>
          </h2>
          <p className="text-base mt-4">
            Our web-based group study platform is designed to streamline the
            entire assignment process, from creation to submission and grading.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.slice(0,9).map((item, i) => (
            <FeatureCard key={i} item={item}></FeatureCard>
          ))}
        </div>
      </div>
    );
};

export default Features;