import imageleft from '../assets/img/femeie.png';
import imageright from '../assets/img/maini.png';
import video from '../assets/img/video.png'
function Story() {


  return (
    <>
        <div className="storyContainer">
            <div className="storyTitle">
                <span>Our Story</span>
            </div>
            <div className='storyContentContainer'>
                    <img src={imageright} alt="left" className="storyImageLeft" />
                <div className="storyContent">

                    <div className="storyText">
                        <div className='storyinnertext'>
                        <span ><span className='lps'></span>Our journey began far from the remote coffee-growing highlands of Colombia, but our roots have always pulled us back. Over the years, we’ve built close, personal relationships with Indigenous farmers who grow extraordinary Arabica coffee and special micro-lots at high altitudes. We work hand in hand with these communities, not just by sourcing coffee, but by sharing their craft with full transparency and respect. Every bean we carry comes with a name, a place, a story, traceable from the mountains to your cup. Our purpose is simple: to reconnect Indigenous growers with coffee roasters around the world, and to honor the people behind every harvest. Specialty coffee shaped by nature, tradition, and care.</span>

                        </div>
                    </div>

                </div>
                <div className='storyVideo'>
  <a 
    href="https://youtu.be/TaANGJRq1L8" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="videoLink"
  >
    <img src={video} alt='video' className='videoStory' />
    <span>Check out our farms!</span>
  </a>
</div>
                    <img src={imageleft} alt="left" className="storyImageRight" />
            </div>
        </div>
    </>
  );
}

export default Story;
