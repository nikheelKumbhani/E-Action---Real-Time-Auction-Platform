import { Container, Title } from "../../router";
import { Gavel, FileText, Users, CreditCard, AlertCircle, Scale, Shield } from "lucide-react";

export const TermsAndConditions = () => {
    return (
        <section className="min-h-screen bg-gray-50 py-12">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200">
                <Container>
                    <div className="py-12 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                <FileText className="w-8 h-8 text-emerald-600" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Please read these terms and conditions carefully before using our auction platform.
                        </p>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="max-w-4xl mx-auto mt-12">
                    <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-8 md:p-12">
                        <div className="space-y-8 text-gray-700">
                            {/* Section 1 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
                                </div>
                                <p>
                                    By accessing and using this auction platform, you accept and agree to be bound by the terms and provision of this agreement.
                                    If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">2. User Account</h2>
                                </div>
                                <p>
                                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility
                                    for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                                </p>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <Gavel className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">3. Bidding Rules</h2>
                                </div>
                                <p>
                                    All bids placed on our platform are binding. Once you place a bid, you enter into a legally binding contract to purchase
                                    the item if you are the winning bidder. Bids cannot be retracted except in exceptional circumstances as determined by platform administrators.
                                </p>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">4. Payment Terms</h2>
                                </div>
                                <p>
                                    Winners must complete payment within 48 hours of auction end. Failure to complete payment may result in account suspension
                                    and forfeiture of winning bid. All payments are processed securely through our payment gateway.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">5. Seller Responsibilities</h2>
                                </div>
                                <p>
                                    Sellers must accurately describe items and provide truthful information. Misrepresentation of items may result in account
                                    termination. Sellers are responsible for shipping items to winning bidders in a timely manner.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <AlertCircle className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">6. Prohibited Activities</h2>
                                </div>
                                <p>
                                    Users may not engage in bid manipulation, shill bidding, or any fraudulent activity. Prohibited items include illegal goods,
                                    counterfeit items, and items that violate intellectual property rights.
                                </p>
                            </div>

                            {/* Section 7 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <Scale className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">7. Dispute Resolution</h2>
                                </div>
                                <p>
                                    In case of disputes between buyers and sellers, our platform will act as a mediator. Final decisions regarding disputes
                                    rest with platform administrators. Users agree to cooperate in good faith to resolve any issues.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                                <p>
                                    We are not responsible for the quality, safety, or legality of items advertised. We do not guarantee the accuracy of
                                    user-provided information. Our liability is limited to the maximum extent permitted by law.
                                </p>
                            </div>

                            {/* Section 9 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications to Terms</h2>
                                <p>
                                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
                                    Continued use of the platform constitutes acceptance of modified terms.
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Information</h2>
                                <p className="mb-3">For questions about these Terms and Conditions, please contact us at:</p>
                                <p className="text-gray-700"><strong>Email:</strong> support@auctionhub.com</p>
                            </div>

                            {/* Last Updated */}
                            <div className="text-sm text-gray-500 pt-6 border-t border-gray-200 text-center">
                                Last Updated: February 13, 2026
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
