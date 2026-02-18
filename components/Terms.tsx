import React from 'react';

const Terms: React.FC = () => {
  return (
    <main className="main-wrapper">
      <div className="text-page-container">
        <h1 className="text-page-title">Terms and Conditions</h1>
        <div className="text-page-content">
          <p>Last updated: October 26, 2023</p>
          
          <h3>1. Introduction</h3>
          <p>Welcome to District. By accessing our website and using our services, you agree to be bound by these Terms and Conditions.</p>
          
          <h3>2. Event Registration</h3>
          <p>When you register for an event, you agree to provide accurate and complete information. We reserve the right to refuse service or cancel registrations at our discretion.</p>
          
          <h3>3. Code of Conduct</h3>
          <p>All attendees are expected to behave in a respectful manner. Harassment, discrimination, or disruptive behavior will not be tolerated and may result in removal from the event.</p>
          
          <h3>4. Cancellation and Refunds</h3>
          <p>Refund policies vary by event. Please refer to the specific event details for information regarding cancellations and refunds.</p>
          
          <h3>5. Limitation of Liability</h3>
          <p>District and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of our services or attendance at events.</p>
        </div>
      </div>
    </main>
  );
};

export default Terms;