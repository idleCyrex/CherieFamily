import cucumber from '../assets/img/cucumber.png'
function Footer() {
 
  return (
    <>
        <div className="footercontainer">
          <div className='footerleft'>
            <span className='footerTitle'>Ready to collaborate?</span>
            <span className='footerSmall'><i className="fa-solid fa-location-dot"></i> Aleea Lunca Florilor 4, Bucharest, Romania</span>
            <span className='footerSmall'><i className="fa-solid fa-phone"></i> +33 674 81 00 18</span>
            <span className='footerSmall'><i className="fa-solid fa-phone"></i> +33 787 36 14 14</span>
            <span className='footerSmall'><i className="fa-solid fa-envelope"></i> contact@cheriefamily.com</span>
          </div>
          <div className='footerright'>
            <img src={cucumber} alt="cucumber" />
          </div>
        </div>
    </>
  )
}

export default Footer
