import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import home1 from '../../assets/home/house1.jpeg';
import home2 from '../../assets/home/house2.jpeg';
import home3 from '../../assets/home/house3.jpeg';
import home4 from '../../assets/home/house4.jpeg';
import home5 from '../../assets/home/house5.jpeg';
import home6 from '../../assets/home/house6.jpeg';

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src={home1} />
            </div>
            
            <div>
                <img src={home2} />
            </div>
            
            <div>
                <img src={home3} />
            </div>
            
            <div>
                <img src={home4} />
            </div>
            
            <div>
                <img src={home5} />
            </div>
            
            <div>
                <img src={home6} />
            </div>
            
        </Carousel>
    );
};

export default Banner;