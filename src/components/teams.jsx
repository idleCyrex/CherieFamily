import React from 'react';
import './story.css';
import women from '../assets/img/women.avif';
import boy from '../assets/img/boy.jpg';
function Teams() {
  // scalable data: add/remove members in this array
 const members = [
    {
      id: 0,
      name: 'Duc',
      role: 'Project Leader',
      img: boy,
      linkedin: 'https://www.linkedin.com/in/letruyenduc/',
      website: '#',
    },
    {
      id: 1,
      name: 'Alexandru',
      role: 'Web Developer',
      img: boy,
      linkedin: 'https://www.linkedin.com/in/alexandru-pavelescu-92720738b/',
      website: 'https://idlee.xyz',
    },
    {
      id: 2,
      name: 'Alexandre',
      role: 'Web Developer',
      img: boy,
      linkedin: 'https://www.linkedin.com/in/alexandre-moundy-74835a363/',
      website: '#',
    },
    {
      id: 3,
      name: 'Daria',
      role: 'Developer',
      img: women,
      linkedin: 'https://www.linkedin.com/in/daria-rebenciuc-664508386/',
      website: '#',
    },
    {
      id: 4,
      name: 'Ariel',
      role: '2d / Music Artist',
      img: boy,
      linkedin: 'https://www.linkedin.com/in/ariel-reuff-767a52385/',
      website: '#',
    },
    {
      id: 5,
      name: 'Yannis',
      role: 'Story writer',
      img: boy,
      linkedin: 'https://www.linkedin.com/in/yannis-ajabi-3b14b6386/',
      website: '#',
    },
    {
      id: 6,
      name: 'Clément',
      role: 'Developer / Tester',
      img: boy,
      linkedin: 'https://www.linkedin.com/in/clément-sennani-6344b2386',
      website: '#',
    },
    {
      id: 7,
      name: 'David',
      role: 'Developer ',
      img: boy,
      linkedin: 'https://www.linkedin.com/in/david-lupanciuc-82210b372/',
      website: '#',
    },
  ];

  return (
    <section className="contact-section dark-vibe">
      <div className="contact-content">
        <h2 className="contact-title big">Our team</h2>
        <p className="contact-sub light">A small group of passionate people building beautiful experiences.</p>

        {/* render a separate frame per member so each has its own container */}
        <div className='team-containerr'>

        {members.map((m) => (
          <div className="teams-frame" key={m.id}>
            <div className="teams-inner">
              <article className="team-card">
                <div className="team-portrait">
                  <img src={m.img} alt={m.name} />
                </div>

                <div className="team-meta">
                  <h3 className="team-name">{m.name}</h3>
                  <p className="team-role">{m.role}</p>
                </div>

                <div className="team-buttons">
                  <button className="team-btn" href={m.twitter} aria-label={`${m.name} twitter`}>
                    💼
                  </button>
                  <button className="team-btn" href={m.website} aria-label={`${m.name} website`}>
                    🌐
                  </button>
                </div>
              </article>
            </div>

          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

export default Teams;
