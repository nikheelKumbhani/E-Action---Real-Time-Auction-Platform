import { Container, Title } from "../../router";
import { Gavel, Shield, Lock, Eye, Cookie, FileText } from "lucide-react";

export const PrivacyPolicy = () => {
    return (
        <section className="min-h-screen bg-gray-50 py-12">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200">
                <Container>
                    <div className="py-12 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Shield className="w-8 h-8 text-emerald-600" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
                                    <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
                                </div>
                                <p className="mb-3">We collect the following types of information:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Personal information (name, email address, phone number)</li>
                                    <li>Payment information (processed securely through third-party payment processors)</li>
                                    <li>Bidding and transaction history</li>
                                    <li>Device and browser information</li>
                                    <li>IP address and location data</li>
                                </ul>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <Eye className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
                                </div>
                                <p className="mb-3">Your information is used to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Process transactions and manage your account</li>
                                    <li>Send notifications about bids, auctions, and account activity</li>
                                    <li>Improve our platform and user experience</li>
                                    <li>Prevent fraud and ensure platform security</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                                <p className="mb-3">
                                    We do not sell your personal information to third parties. We may share your information with:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Payment processors for transaction processing</li>
                                    <li>Shipping partners for order fulfillment</li>
                                    <li>Law enforcement when required by law</li>
                                    <li>Service providers who assist in platform operations</li>
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">4. Data Security</h2>
                                </div>
                                <p>
                                    We implement industry-standard security measures to protect your personal information. This includes encryption,
                                    secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                        <Cookie className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">5. Cookies and Tracking</h2>
                                </div>
                                <p>
                                    We use cookies and similar technologies to enhance user experience, analyze platform usage, and remember your preferences.
                                    You can control cookie settings through your browser, but some features may not function properly if cookies are disabled.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                                <p className="mb-3">You have the right to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Access your personal data</li>
                                    <li>Request correction of inaccurate data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Object to data processing</li>
                                    <li>Export your data in a portable format</li>
                                </ul>
                            </div>

                            {/* Section 7 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
                                <p>
                                    We retain your personal information for as long as necessary to provide our services and comply with legal obligations.
                                    Transaction records are kept for a minimum of 7 years for accounting and legal purposes.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                                <p>
                                    Our platform is not intended for users under the age of 18. We do not knowingly collect personal information from children.
                                    If we discover that a child has provided us with personal information, we will delete it immediately.
                                </p>
                            </div>

                            {/* Section 9 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
                                <p>
                                    Your information may be transferred to and processed in countries other than your country of residence.
                                    We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
                                </p>
                            </div>

                            {/* Section 10 */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Privacy Policy</h2>
                                <p>
                                    We may update this privacy policy from time to time. We will notify you of significant changes via email or
                                    platform notification. Continued use of the platform after changes constitutes acceptance of the updated policy.
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact Us</h2>
                                <p className="mb-3">For privacy-related questions or to exercise your rights, contact us at:</p>
                                <div className="space-y-1 text-gray-700">
                                    <p><strong>Email:</strong> privacy@auctionhub.com</p>
                                    <p><strong>Address:</strong> Data Protection Officer, Auction Hub Platform</p>
                                </div>
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
