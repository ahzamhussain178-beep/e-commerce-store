import React from 'react';
import StaticPage from './StaticPage';

const Returns = () => (
  <StaticPage title="Returns & Refunds">
    <h2 className="text-lg font-semibold mb-2">Hassle-free returns</h2>
    <p className="text-gray-600 mb-4">If you're not satisfied, return items within 30 days in original condition for a refund.</p>
    <h3 className="font-semibold">How to start a return</h3>
    <ol className="list-decimal pl-5 text-gray-600 mb-4">
      <li>Go to your Orders in your account.</li>
      <li>Select the order and choose 'Start Return'.</li>
      <li>Follow the instructions and ship the item using our label.</li>
    </ol>
    <h3 className="font-semibold">Refund timing</h3>
    <p className="text-gray-600">Refunds are processed within 7 business days after we receive the returned item.</p>
  </StaticPage>
);

export default Returns;
