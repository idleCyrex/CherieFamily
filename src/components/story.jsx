function Story() {
  return (
    <div className="story_container">
      <div className='story_wrapper'>
        <span className='story_desc'>
          Every dish is carefully crafted by specialized chefs, blending gourmet flavors with refined presentation. Platters are meticulously packaged in insulated coolers to maintain perfect freshness and temperature, ensuring everything arrives in impeccable condition.
        </span>
        <span className='story_desc'>
          Our dedicated drivers deliver each order directly to your yacht, where every item is beautifully arranged and ready to be enjoyed immediately. From delicate tapas and artisanal bites to signature desserts and chilled beverages, we provide a seamless and luxurious onboard dining experience every time.          
        </span>
        <a 
          href="/Menu Cherie at Sea.pdf" 
          download="Menu Cherie at Sea.pdf" 
          className='story_desc_highlight'
        >
          Luxury onboard? Sorted. Tap to order!
        </a>
      </div>
    </div>
  );
}

export default Story;
