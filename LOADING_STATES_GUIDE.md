# Loading States Implementation Guide

## Overview
Created comprehensive loading states and skeleton screens to improve user experience during navigation and data fetching.

## Created Components

### 1. Skeleton Components

#### ProductSkeleton (`/components/common/skeletons/ProductSkeleton.jsx`)
- **ProductCardSkeleton**: Single product card skeleton
- **ProductListSkeleton**: Grid of product skeletons
- **Usage**:
```jsx
import { ProductListSkeleton } from "../../router";

{isLoading ? <ProductListSkeleton count={6} /> : <ProductList />}
```

#### TableSkeleton (`/components/common/skeletons/TableSkeleton.jsx`)
- Configurable rows and columns
- **Usage**:
```jsx
import { TableSkeleton } from "../../router";

{isLoading ? <TableSkeleton rows={5} columns={4} /> : <DataTable />}
```

#### DashboardSkeleton (`/components/common/skeletons/DashboardSkeleton.jsx`)
- Stats cards, charts, and activity sections
- **Usage**:
```jsx
import { DashboardSkeleton } from "../../router";

{isLoading ? <DashboardSkeleton /> : <DashboardContent />}
```

#### ProfileSkeleton (`/components/common/skeletons/ProfileSkeleton.jsx`)
- Avatar, user info, and activity sections
- **Usage**:
```jsx
import { ProfileSkeleton } from "../../router";

{isLoading ? <ProfileSkeleton /> : <UserProfile />}
```

### 2. Loader Components

#### PageLoader (`/components/common/loaders/PageLoader.jsx`)
- **PageLoader**: Centered spinner for page sections
- **FullPageLoader**: Full-screen overlay loader
- **ButtonLoader**: Small spinner for buttons
- **Usage**:
```jsx
import { PageLoader, FullPageLoader, ButtonLoader } from "../../router";

// Page section
{isLoading && <PageLoader message="Loading products..." />}

// Full page overlay
{isSubmitting && <FullPageLoader message="Processing..." />}

// Button
<button disabled={isLoading}>
  {isLoading ? <ButtonLoader /> : "Submit"}
</button>
```

#### NavigationProgress (`/components/common/loaders/NavigationProgress.jsx`)
- Top progress bar during route changes
- **Already added to App.tsx** - works automatically!

## Implementation Examples

### Example 1: Product List Page

```jsx
import { useState, useEffect } from "react";
import { ProductListSkeleton } from "../../router";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ProductListSkeleton count={6} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

### Example 2: Dashboard Page

```jsx
import { DashboardSkeleton } from "../../router";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const { isLoading, stats } = useSelector(state => state.dashboard);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Dashboard content */}
    </div>
  );
};
```

### Example 3: User Profile

```jsx
import { ProfileSkeleton } from "../../router";

export const UserProfile = () => {
  const { user, isLoading } = useSelector(state => state.auth);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile content */}
    </div>
  );
};
```

### Example 4: Data Table

```jsx
import { TableSkeleton } from "../../router";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <TableSkeleton rows={10} columns={5} />;
  }

  return (
    <table>
      {/* Table content */}
    </table>
  );
};
```

### Example 5: Form Submission

```jsx
import { ButtonLoader, FullPageLoader } from "../../router";

export const ProductForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('/api/products', formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && <FullPageLoader message="Creating product..." />}
      
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <ButtonLoader /> Creating...
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </>
  );
};
```

## Pages to Update

### High Priority (Data-Heavy Pages)

1. **Product Listings** (`src/app/screens/product/productlist/ProductList.jsx`)
   - Use `ProductListSkeleton`

2. **Dashboard** (`src/app/screens/dashboard/Dashboard.jsx`)
   - Use `DashboardSkeleton`

3. **User Profile** (`src/app/screens/auth/UserProfile.jsx`)
   - Use `ProfileSkeleton`

4. **User List** (`src/app/admin/UserList.jsx`)
   - Use `TableSkeleton`

5. **Admin Product List** (`src/app/admin/product/AdminProductList.jsx`)
   - Use `TableSkeleton` or `ProductListSkeleton`

6. **Winning Bids** (`src/app/screens/product/WinningBidList.jsx`)
   - Use `TableSkeleton`

7. **Category List** (`src/app/admin/category/Catgeorylist.jsx`)
   - Use `TableSkeleton`

### Medium Priority

8. **Product Details** (`src/app/screens/product/ProductsDetailsPage.jsx`)
   - Use `PageLoader`

9. **Add Product** (`src/app/screens/product/AddProduct.jsx`)
   - Use `ButtonLoader` for submit button

10. **Product Edit** (`src/app/screens/product/ProductEdit.jsx`)
    - Use `ButtonLoader` and `PageLoader`

## Best Practices

### 1. Always Show Loading State
```jsx
// ❌ Bad - No loading state
const [data, setData] = useState([]);

// ✅ Good - Clear loading state
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
```

### 2. Use Appropriate Skeleton
```jsx
// ❌ Bad - Generic loader for everything
{isLoading && <Loader />}

// ✅ Good - Skeleton matches content
{isLoading ? <ProductListSkeleton /> : <ProductGrid />}
```

### 3. Handle Error States
```jsx
if (isLoading) return <ProductListSkeleton />;
if (error) return <ErrorMessage />;
if (!products.length) return <EmptyState />;
return <ProductGrid />;
```

### 4. Button Loading States
```jsx
// ✅ Good - Disabled + visual feedback
<button disabled={isLoading}>
  {isLoading ? (
    <><ButtonLoader /> Processing...</>
  ) : (
    "Submit"
  )}
</button>
```

## Animation Classes

All skeletons use Tailwind's `animate-pulse` class for smooth loading animation:
```jsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded"></div>
</div>
```

## Current Status

✅ **Completed**:
- Created 4 skeleton components (Product, Table, Dashboard, Profile)
- Created 3 loader components (Page, FullPage, Button)
- Created NavigationProgress component
- Added to router exports
- Integrated NavigationProgress in App.tsx

⏳ **Next Steps**:
1. Update product listing pages with `ProductListSkeleton`
2. Update dashboard with `DashboardSkeleton`
3. Update user profile with `ProfileSkeleton`
4. Update admin tables with `TableSkeleton`
5. Add `ButtonLoader` to all form submissions
6. Test loading states across all pages

## Testing Checklist

- [ ] Product list shows skeleton while loading
- [ ] Dashboard shows skeleton on first load
- [ ] User profile shows skeleton
- [ ] Admin tables show skeleton
- [ ] Navigation progress bar appears on route change
- [ ] Form buttons show loading state
- [ ] No blank screens during data fetch
- [ ] Smooth transitions from skeleton to content
