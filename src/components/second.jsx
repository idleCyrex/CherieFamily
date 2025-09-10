import wave from '../assets/img/1.png';

function Second() {
  return (
    <div>
      <img src={wave} alt="wave" className='wave_img unselectable' />
      <div id='second' className="second_container">
        <div className='second_wrapper'>
          <span className='second_desc'>
            At Chérie at Sea, we create luxury catering experiences designed with the yachting lifestyle in mind, serving <span className='bold'>Marbella, Málaga, Gibraltar</span>, and the rest of the <span className='bold'>Costa del Sol</span>. From sunrise breakfasts to sunset soirées, our menus are crafted to elevate every moment onboard.
          </span>
          <span className='second_desc'>
            Our bespoke platters feature only the finest ingredients: jamón ibérico, caviar, artisanal tapas, fresh seasonal fruit, and signature desserts, paired with chilled champagne, fine wines, and refreshing juices. Each order is delivered directly to your yacht, ready to be enjoyed without effort, whether for an intimate cruise, a charter guest experience, or a special celebration at sea. 
          </span>
          <span className='second_desc'>
            Orders can be placed <span className='bold'>until 9 PM the day before</span> your event and there is <span className='bold'>no minimum</span> number of guests.
          </span>
          
          <a 
            href="/Menu Cherie at Sea.pdf" 
            download="Menu Cherie at Sea.pdf"
          >
            <button className="button">
              <span>MENU</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Second;
