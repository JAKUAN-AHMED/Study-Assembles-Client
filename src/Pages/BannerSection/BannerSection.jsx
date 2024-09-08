// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const BannerSection = () => {
  // Updated images array with text
  const slides = [
    {
      src: "https://i.ibb.co/fQTMwLb/Banner-Pic.jpg",
      text: "Welcome to the Group Study Platform",
    },
    {
      src: "https://i.ibb.co.com/f8JCWYL/banner2.jpg",
      text: "Create and Manage Assignments Effortlessly",
    },
    {
      src: "https://i.ibb.co.com/ZS2npC2/banner4.jpg",
      text: "Submit and Grade Assignments Online",
    },
    {
      src: "https://i.ibb.co.com/wBhNbPM/banner3.jpg",
      text: "Collaborate with Your Peers Seamlessly",
    },
  ];

  return (
    <div className="mt-8 mb-8 relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-200 text-top lg:text-4xl bg-black bg-opacity-50 p-4 rounded-lg lg:w-[500px]  gap-4 ">
              {slide.text}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSection;
