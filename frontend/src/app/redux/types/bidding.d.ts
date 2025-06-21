export interface BiddingState {
    history: any[];
    bidding: any;
    isError: boolean;
    isLoading: boolean;
    message: string;
    error: string | null;
}

export interface BidData {
    productId: string;
    price: number;
}
