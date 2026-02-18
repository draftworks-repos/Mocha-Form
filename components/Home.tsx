import React from 'react';
import EventForm from './EventForm';
import { Languages, Clock, Ticket, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <main className="main-wrapper">
      <div className="content-grid">
        {/* Left Column: Context/Description */}
        <div className="context-column">
          
          {/* Event Hero Image - Moved here */}
          <div className="event-hero-wrapper">
            <img 
              src="https://picsum.photos/1200/600" 
              alt="Event Hero" 
              className="event-hero-img"
            />
          </div>

          {/* About Section */}
          <section>
            <h2 className="section-title">About the Event</h2>
            <div className="event-description-wrapper">
              <p className="event-description">
                Mocha Mono Vol. 1 was a hit — and with all the love you showed us, we're back with Volume 2. 
              </p>
              <p className="event-description" style={{ marginTop: '12px' }}>
                We are taking you back to the roots. Before playlists, before algorithms, there was vinyl, mixtapes, and real listening. 
              </p>
              <p className="event-description" style={{ marginTop: '12px' }}>
                Join us for an intimate evening of pure analog sound, carefully curated tracks, and a community that appreciates the deep cuts. Expect rare grooves, classic hits, and the warm crackle that only a needle on a record can provide.
              </p>
            </div>
          </section>

          <hr className="divider" />

          {/* Event Guide */}
          <section>
            <div className="guide-header">
              <h3 className="section-title" style={{ marginBottom: 0 }}>Event Guide</h3>
            </div>
            
            <div className="guide-grid">
              <div className="guide-item">
                <div className="guide-icon-bg">
                  <Languages size={20} />
                </div>
                <div className="guide-info">
                  <span className="guide-label">Language</span>
                  <span className="guide-value">English, Hindi</span>
                </div>
              </div>

              <div className="guide-item">
                <div className="guide-icon-bg">
                  <Clock size={20} />
                </div>
                <div className="guide-info">
                  <span className="guide-label">Duration</span>
                  <span className="guide-value">3 Hours 30 Mins</span>
                </div>
              </div>

              <div className="guide-item">
                <div className="guide-icon-bg">
                  <Ticket size={20} />
                </div>
                <div className="guide-info">
                  <span className="guide-label">Tickets Needed For</span>
                  <span className="guide-value">All ages</span>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Bento Grid */}
          <section>
            <h3 className="section-title">Gallery</h3>
            <div className="bento-grid">
              <div className="bento-item bento-item-1">
                <img src="https://picsum.photos/800/800?random=10" alt="Gallery Main" />
              </div>
              <div className="bento-item bento-item-2">
                <img src="https://picsum.photos/400/400?random=11" alt="Gallery 2" />
              </div>
              <div className="bento-item bento-item-3">
                <img src="https://picsum.photos/400/400?random=12" alt="Gallery 3" />
              </div>
              <div className="bento-item bento-item-4">
                <img src="https://picsum.photos/400/400?random=13" alt="Gallery 4" />
              </div>
              <div className="bento-item bento-item-5">
                <img src="https://picsum.photos/400/400?random=14" alt="Gallery 5" />
              </div>
            </div>
          </section>
          
          <div className="venue-card-wrapper">
              <div className="venue-card">
                  <div className="venue-info">
                      <h4>Venue Details</h4>
                      <p>The B.O.M.B.A.I | Chandrasekharpur, Bhubaneshwar</p>
                  </div>
                  <button className="directions-btn">
                      <MapPin size={14} />
                      Get Directions
                  </button>
              </div>
          </div>
        </div>

        {/* Right Column: The Requested Form */}
        <div className="form-column">
          <div className="sticky-wrapper">
            <EventForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;