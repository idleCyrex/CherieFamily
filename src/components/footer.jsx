import wave from '../assets/img/2.png'

function Footer() {
  return (
    <div>
      <img src={wave} alt="wave" className='wave_img2 unselectable'/>
      <div className='contact_wrapper2'>
        <div className='contact_wrapper'>
          <div className='contact_container'>
            <span className='contact_title'>GET IN TOUCH!</span>
            <span className='contact_desc'>contact@cheriefamily.com</span>
            <span className='contact_desc'>+33 787 26 14 14</span>
            <span className='contact_desc'>+33 674 81 00 18</span>
            <span className='contact_desc'>OPEN 24/7</span>
            <span className='contact_desc'>Marbella</span>    
          </div>
          <div className='contact_container2'>
            <span className='contact_title'>FOLLOW US ON SOCIALS!</span>
            <div>
              <div className='contact_icons_wrapper'>
                <a
                  href="https://www.instagram.com/cherieatsea/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='contact_icon_circle'
                >
                  <i className="fa-brands fa-instagram contact_icon"></i>
                </a>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='contact_icon_circle'
                >
                  <i className="fa-brands fa-tiktok contact_icon"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/ch%C3%A9rie-exports/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='contact_icon_circle'
                >
                  <i className="fa-brands fa-linkedin-in contact_icon"></i>
                </a>                        
              </div>
            </div>
          </div>
        </div> 
      </div>
      <div className="footer_wrapper">
        <div className="footer_container">
          <span className='footer_desc_wrapper'>
             <span className='footer_desc'>
                Chérie Exports © 2025<span className='linieeee'>|</span>
              </span>
              <span className='footer_desc'>
                 Privacy Policy. Terms of Service. Cookie Policy
               </span>
          </span>
          <div className='footer_logos'>
            <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer">
              <img 
                alt="anpc"
                loading="lazy"
                height="50"
                width="200"
                src="https://assets-eu-01.kc-usercontent.com:443/b50b8cce-450a-0138-7b43-de6bc2f3ad32/32f50dd4-4174-47aa-973f-b49499c5e371/anpc.png?w=200&fm=webp&lossless=0&q=80"
              />
            </a>
            <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" target="_blank" rel="noopener noreferrer">
              <img 
                alt="europa"
                loading="lazy"
                height="50"
                width="200"
                src="https://assets-eu-01.kc-usercontent.com:443/b50b8cce-450a-0138-7b43-de6bc2f3ad32/6773f8ba-14f0-4918-a1b2-0f8b97077d30/sol.png?w=200&fm=webp&lossless=0&q=80"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
