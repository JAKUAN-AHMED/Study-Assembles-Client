import { useEffect, useState } from "react";
import FeatureCard from "../../Cards/FeatureCard";

const Features = () => {
    const[features,setFeatures]=useState([]);
    useEffect(()=>{
        fetch('features.json')
        .then(res=>res.json())
        .then(data=>setFeatures(data));
    },[])
    return (
      <div className="mt-8 mb-24 overflow-hidden">
        <div className="text-center font-poppins mb-20 mt-24 gap-y-3">
          <h2 className="font-bold text-4xl">
            <span className="bg-purple-600">All</span>{" "}
            <span className="bg-blue-400">Featu</span>
            <span className="bg-yellow-400">res</span>
          </h2>
          <p className="text-base mt-4">
            Our web-based group study platform is designed to streamline the
            entire assignment process, from creation to submission and grading.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((item, i) => (
            <FeatureCard key={i} item={item}></FeatureCard>
          ))}
        </div>
      </div>
    );
};

export default Features;