import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../app/redux/services/productServices';
import BiddingHistory from '../components/BiddingHistory';
import { useGetBiddingHistoryQuery } from '../app/redux/services/beddingServices';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const { data: biddingHistory, isLoading: isLoadingHistory } = useGetBiddingHistoryQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <p className="mb-4">{product.description}</p>
      <p className="mb-4">Base Price: ${product.basePrice}</p>
      <p className="mb-4">Current Highest Bid: ${product.highestBid}</p>
      <p className="mb-4">Bid End Date: {new Date(product.bidEndDate).toLocaleString()}</p>
      
      {/* Add Bidding History Section */}
      {isLoadingHistory ? (
        <div className="text-center">Loading bidding history...</div>
      ) : (
        <BiddingHistory bids={biddingHistory} />
      )}
    </div>
  );
};

export default ProductDetails;