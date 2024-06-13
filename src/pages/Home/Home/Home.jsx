
import Banner from '../Banner/Banner'
import Testimonials from '../Testimonials/Testimonials';
import Advertisement from '../Advertisement/Advertisement';
// import Blogs from '../../../components/Blogs/Blogs';
import FeaturedProperties from '../FeaturedProperties/FeaturedProperties';
import Reviews from '../../Reviews/Reviews';
// import Map from '../../../components/Map/Map';



const Home = () => {
    return (
        <div>
        
        <Banner></Banner>
        <FeaturedProperties></FeaturedProperties>
        <Advertisement></Advertisement>     
        <Reviews></Reviews>

        <Testimonials></Testimonials>
        {/* <Blogs></Blogs> */}
        {/* <Map></Map> */}

 
            
            
        </div>
    );
};

export default Home;