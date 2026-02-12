import React from 'react';
import moment from 'moment';

const BiddingHistory = ({ bids }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Bidding History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Bidder</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {bids && bids.length > 0 ? (
              bids.map((bid, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{bid.user?.name || 'Anonymous'}</td>
                  <td className="py-2 px-4 border-b text-center">${bid.price}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {moment(bid.createdAt).format('MMM DD, YYYY HH:mm')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  No bids placed yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BiddingHistory;
