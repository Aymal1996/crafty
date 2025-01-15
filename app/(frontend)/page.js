import Banner from "@/components/frontend/Banner";
import BestSellingProduct from "@/components/frontend/BestSellingProduct";
import Carousel_1 from "@/components/frontend/Carousel_1";
import CategorySlider from "@/components/frontend/CategorySlider";
import Banner_2 from "@/components/frontend/Banner_2";
import VendorSlider from "@/components/frontend/VendorSlider";
import Testimonial from "@/components/frontend/Testimonial";

export default function index(){
    return(
        <>
        <Banner />
        <BestSellingProduct />
        <Carousel_1 />
        <CategorySlider />
        <Banner_2 />
        <VendorSlider />
        <Testimonial />
        </>
    )
} 