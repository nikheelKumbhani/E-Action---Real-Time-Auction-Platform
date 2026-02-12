import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { placeBid } from '../../../redux/features/biddingSlice';

export function AuctionDetails({ product, userBalance }) {
  const [bidAmount, setBidAmount] = useState('');
  const dispatch = useDispatch();

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    const amount = parseFloat(bidAmount);

    if (!amount || amount <= 0) {
      toast.error('Please enter a valid bid amount');
      return;
    }

    if (amount > userBalance) {
      toast.error('Insufficient balance to place this bid');
      return;
    }

    if (amount <= product.basePrice) {
      toast.error('Bid must be higher than base price');
      return;
    }

    try {
      await dispatch(placeBid({
        price: amount,
        ProductId: product._id
      })).unwrap();
      setBidAmount('');
    } catch (error) {
      console.error('Failed to place bid:', error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Place Your Bid</h3>
      <div className="mb-4 space-y-2">
        <p>Your Balance: ${userBalance}</p>
        <p>Base Price: ${product.basePrice}</p>
      </div>
      <form onSubmit={handlePlaceBid}>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter bid amount"
          className="w-full p-2 border rounded mb-2"
          min={product.basePrice}
          step="0.01"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={!bidAmount || parseFloat(bidAmount) > userBalance}
        >
          Place Bid
        </button>
      </form>
    </div>
  );
}
