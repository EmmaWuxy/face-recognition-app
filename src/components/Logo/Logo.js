import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './Logo.png';


function Logo() {
    return (
        <Tilt className='Tilt'>
            <div>
                <img src={brain} alt='logo'/>
            </div>
        </Tilt>
    );
}

export default Logo;