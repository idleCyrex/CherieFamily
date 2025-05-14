import romania from '../assets/img/romania.png';
import columbia from '../assets/img/columbia.png';
import safty1 from '../assets/img/1.png';
import safty2 from '../assets/img/2.png';
import safty3 from '../assets/img/3.png';
import safty4 from '../assets/img/4.png';
import safty5 from '../assets/img/5.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='fotetercontr'>
      <div id="footer" className="footercontainer">

        <div className='footerleft'>
          <div className='adyhwayudh'>
            <span className='footerTitle'>Ready to collaborate?</span>
          </div>
          <div className='dwAHDUAHWDUYAHUD'>
            <div className='spacingfooter'> 
              <i className="fa-solid fa-envelope"></i>  
              <span className='footerSmall'>contact@cheriefamily.com</span>
            </div>
            <div className='spacingfooter'> 
              <i className="fa-solid fa-phone"></i>  
              <span className='footerSmall'> +33 674 81 00 18</span>
            </div>
            <div className='spacingfooter'> 
              <i className="fa-solid fa-phone"></i> 
              <span className='footerSmall'>+33 787 26 14 14</span>
            </div>
                     
          </div>
        </div>
        <img src={columbia} alt="Columbia" className="imagesfooter2" />
      </div>
      <div className='anpc2'>
        <div className='anpcsafty'>
        <img alt="safty" src={safty1} height="80" />
        <img alt="safty" src={safty2} height="80" />
        <img alt="safty" src={safty3} height="80" />
        <img alt="safty" src={safty4} height="80" />
        <img alt="safty" src={safty5} height="80" />
          </div>
        <div className='anpc'>
        <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer">
          <img alt="anpc" loading="lazy" src="https://assets-eu-01.kc-usercontent.com:443/b50b8cce-450a-0138-7b43-de6bc2f3ad32/32f50dd4-4174-47aa-973f-b49499c5e371/anpc.png?w=200&amp;fm=webp&amp;lossless=0&amp;q=80" height="50" width="200" />
        </a>
        <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" target="_blank" rel="noopener noreferrer">
          <img alt="europa" loading="lazy" src="https://assets-eu-01.kc-usercontent.com:443/b50b8cce-450a-0138-7b43-de6bc2f3ad32/6773f8ba-14f0-4918-a1b2-0f8b97077d30/sol.png?w=200&amp;fm=webp&amp;lossless=0&amp;q=80" height="50" width="200" />
        </a>
          </div>
      </div>
      <div className='footerbo2ttom'>
        <span>Chérie Exports © 2025 || <Link to="/terms">Terms of Service</Link></span>
      </div>

    </div>
  );
}

export default Footer;
