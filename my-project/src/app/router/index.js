export { PrivateRoute } from "./PrivateRoute";
export { ScrollToTop } from "../utils/ScrollToTop";
export { NotFound } from "../components/common/NotFound";
export { WinningBidList } from "../screens/product/WinningBidList";
export { Search } from "../screens/search/Search";
export { UserList } from "../admin/UserList";
// // Common Components
export { Breadcrumb, CustomBreadcrumb } from "../components/common/Breadcrumb";
export { LogoutConfirmationModal } from "../components/common/LogoutConfirmationModal";

// // Search Components
export { SearchBar } from "../components/search/SearchBar";
export { SearchFilters } from "../components/search/SearchFilters";
export { SearchResults } from "../components/search/SearchResults";

// // Search Hooks
export { useSearch } from "../hooks/useSearch";
export { useDebounce } from "../hooks/useDebounce";

// // Home Section
export { CategoryCard } from "../components/cards/CategoryCard";
export { default as CategorySection } from "../components/hero/CategorySlider";
export { default as Hero } from "../components/hero/Hero";
export { default as Process } from "../components/hero/Process";
export { default as WhyChooseUs } from "../components/hero/WhyChooseUs";
export { TopSeller } from "../components/hero/TopSeller";
export { Trust } from "../components/hero/Trust";
export { Home } from "../screens/home/Home";

// //Admin Product  Routes
export { Dashboard } from "../screens/dashboard/Dashboard";
export { default as AdminProductList } from "../admin/product/AdminProductList";
export { default as ProductVerificationPage } from "../admin/product/UpdateProductByAdmin";
export { Wallet } from "../admin/Wallet";

// //Category  Routes
export { CreateCategory } from "../admin/category/CreateCategory";
export { UpdateCategory } from "../admin/category/UpdateCategory";
export { Catgeorylist } from "../admin/category/Catgeorylist";

// //Product Routes
export { default as ProductsDetailsPage } from "../screens/product/ProductsDetailsPage";
export { ProductList } from "../screens/product/productlist/ProductList";
export { default as ProductEdit } from "../screens/product//ProductEdit";
export { default as AddProduct } from "../screens/product/AddProduct";  // Updated this line

// // Utilis Routes
export { DateFormatter } from "../utils/DateFormatter";

// // Common Routes
export { Loader } from "../components/common/Loader";
export { CategoryDropDown } from "../components/common/CategoryDropDown";
export { Title, Body, Caption, CustomLink, CustomNavLink, Container, PrimaryButton, ProfileCard, Heading, CustomNavLinkList } from "../components/common/Design";

// // Skeleton Components
export { ProductCardSkeleton, ProductListSkeleton } from "../components/common/skeletons/ProductSkeleton";
export { TableSkeleton } from "../components/common/skeletons/TableSkeleton";
export { DashboardSkeleton } from "../components/common/skeletons/DashboardSkeleton";
export { ProfileSkeleton } from "../components/common/skeletons/ProfileSkeleton";

// // Loader Components
export { PageLoader, FullPageLoader, ButtonLoader } from "../components/common/loaders/PageLoader";
export { NavigationProgress } from "../components/common/loaders/NavigationProgress";

// // Error Handling
export { default as ErrorBoundary } from "../components/common/ErrorBoundary";
export { RouteErrorFallback } from "../components/common/RouteErrorFallback";
export { withErrorBoundary } from "../components/common/withErrorBoundary";

// // Alert Components
export { InlineError, FieldError, ErrorAlert, SuccessAlert, WarningAlert, InfoAlert } from "../components/common/alerts/AlertComponents";

// // Error Utilities
export {
    parseError,
    showErrorToast,
    showSuccessToast,
    showInfoToast,
    showWarningToast,
    handleApiError,
    formatValidationErrors,
    getUserFriendlyMessage,
    ErrorType,
    ErrorSeverity
} from "../utils/errorHandler";

// // Error Handling Hooks
export { useAsyncHandler, useFormErrors, useAlert } from "../hooks/useErrorHandling";

// // Session Management
export { useSessionTimeout, useFormPersistence } from "../hooks/useSessionTimeout";
export { SessionWarningModal } from "../components/common/SessionWarningModal";
export { SessionManager } from "../components/common/SessionManager";
export { SessionSetup } from "../components/common/SessionSetup";
export { setupSessionInterceptor, checkRedirectAfterLogin } from "../utils/sessionInterceptor";
export { saveRememberMe, getSavedEmail, getSavedToken, isRememberMeEnabled, clearRememberMe, updateAuthToken } from "../utils/rememberMe";

// // Layout Routes
export { DashboardLayout } from "../components/common/layout/DashboardLayout";
export { Layout } from "../components/common/layout/Layout";

// // Hook Routes

// // Auth Routes
export { Register } from "../screens/auth/Register";
export { Login } from "../screens/auth/Login";
export { LoginAsSeller } from "../screens/auth/LoginAsSeller";
export { UserProfile } from "../screens/auth/UserProfile";
export { ForgotPassword } from "../screens/auth/ForgotPassword";
export { ResetPassword } from "../screens/auth/ResetPassword";
export { VerifyEmail } from "../screens/auth/VerifyEmail";


// // Product Routes
export { default as ProductPage } from "@/app/screens/page/ProductPage";

// // Legal Pages
export { TermsAndConditions } from "../screens/page/TermsAndConditions";
export { PrivacyPolicy } from "../screens/page/PrivacyPolicy";

// // Info Pages
export { Blog } from "../screens/page/Blog";
export { About } from "../screens/page/About";
export { Services } from "../screens/page/Services";
export { Contact } from "../screens/page/Contact";
