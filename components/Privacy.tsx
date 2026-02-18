import React from 'react';

const Privacy: React.FC = () => {
  return (
    <main className="main-wrapper">
      <div className="text-page-container">
        <h1 className="text-page-title">Privacy Policy</h1>
        <div className="text-page-content">
          <p>Last updated: October 26, 2023</p>
          
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as your name, email address, phone number, and event preferences when you register for an event.</p>
          
          <h3>2. How We Use Your Information</h3>
          <p>We use the information we collect to facilitate your event registration, communicate with you about the event, and improve our services.</p>
          
          <h3>3. Sharing of Information</h3>
          <p>We do not sell your personal information. We may share your information with third-party vendors who assist us in operating our services, subject to confidentiality agreements.</p>
          
          <h3>4. Data Security</h3>
          <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          
          <h3>5. Your Choices</h3>
          <p>You may update your communication preferences or request the deletion of your personal information by contacting us.</p>
        </div>
      </div>
    </main>
  );
};

export default Privacy;