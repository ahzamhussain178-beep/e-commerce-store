import React from 'react';
import StaticPage from './StaticPage';

const Privacy = () => (
  <StaticPage title="Privacy Policy">
    <h2 className="text-lg font-semibold mb-2">Our commitment to privacy</h2>
    <p className="text-gray-600 mb-4">We collect only the data necessary to provide our services. We use industry-standard measures to protect your information.</p>
    <h3 className="font-semibold">Information we collect</h3>
    <ul className="list-disc pl-5 text-gray-600 mb-4">
      <li>Account details (email, name)</li>
      <li>Order history and shipping addresses</li>
      <li>Payment tokens (we do not store raw card data)</li>
    </ul>
    <h3 className="font-semibold">How we use data</h3>
    <p className="text-gray-600 mb-4">To process orders, improve our products, and communicate relevant updates. We never sell personal data to third parties.</p>
  </StaticPage>
);

export default Privacy;
