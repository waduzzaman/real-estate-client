
import Banner from '../Banner/Banner'
import Testimonials from '../Testimonials/Testimonials';
import Advertisement from '../Advertisement/Advertisement';
import Blogs from '../../../components/Blogs/Blogs';
import FeaturedProperties from '../FeaturedProperties/FeaturedProperties';



const Home = () => {
    return (
        <div>
        
        <Banner></Banner>
        <FeaturedProperties></FeaturedProperties>
        <Advertisement></Advertisement>     
        <Testimonials></Testimonials>
        <Blogs></Blogs>

 
            
            
        </div>
    );
};

export default Home;