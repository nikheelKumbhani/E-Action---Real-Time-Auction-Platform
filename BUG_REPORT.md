# Bug Report - E-Action Auction Platform

**Generated on:** 2026-02-12  
**Total Bugs Found:** 15

---

## 🔴 CRITICAL BUGS (Priority: High)

### 1. **Authentication Middleware Silently Fails**
**File:** `backend/middleWare/authMiddleWare.js` (Lines 14-29)  
**Severity:** CRITICAL  
**Description:** The `protect` middleware has commented out error throwing, causing silent failures when authentication fails.

```javascript
if (!token) {
  res.status(401);
  // throw new Error("Not authorized, Please Login");  // ❌ COMMENTED OUT
}
```

**Impact:** Users can bypass authentication checks, leading to unauthorized access to protected routes.

**Fix:** Uncomment the error throwing:
```javascript
if (!token) {
  res.status(401);
  throw new Error("Not authorized, Please Login");
}
```

---

### 2. **Missing Error Handling in JWT Verification**
**File:** `backend/middleWare/authMiddleWare.js` (Lines 18, 26-29)  
**Severity:** CRITICAL  
**Description:** JWT verification can throw errors (expired token, invalid token) but the catch block doesn't throw an error.

```javascript
try {
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  // ...
} catch (error) {
  res.status(401);
  // throw new Error("Not authorized, Please Login");  // ❌ COMMENTED OUT
}
```

**Impact:** Invalid or expired tokens are not properly rejected, potentially allowing unauthorized access.

**Fix:** Properly handle the error in the catch block.

---

### 3. **User Balance Not Deducted After Placing Bid**
**File:** `backend/controllers/biddingCtr.js` (Lines 7-98)  
**Severity:** CRITICAL  
**Description:** The `placeBid` function checks if user has sufficient balance but never deducts it.

```javascript
if (user.balance < price) {
  return res.status(400).json({ message: "Insufficient balance to place this bid." });
}
// ❌ Balance is checked but never deducted
```

**Impact:** Users can place unlimited bids without actually having the funds, breaking the auction system's financial integrity.

**Fix:** Deduct the bid amount from user balance and refund previous bid if updating.

---

### 4. **Incorrect User ID Reference**
**File:** `backend/controllers/userCtr.js` (Line 202)  
**Severity:** HIGH  
**Description:** Inconsistent use of `req.user.id` vs `req.user._id`.

```javascript
const user = await User.findById(req.user.id);  // ❌ Should be req.user._id
```

**Impact:** May cause "User not found" errors depending on how the user object is populated.

**Fix:** Use consistent `req.user._id` throughout the codebase.

---

## 🟡 MAJOR BUGS (Priority: Medium)

### 5. **Typo in Error Message**
**File:** `backend/controllers/userCtr.js` (Line 20)  
**Severity:** MEDIUM  
**Description:** Spelling error in validation message.

```javascript
throw new Error("Please fill in all required fileds");  // ❌ "fileds" should be "fields"
```

---

### 6. **Typo in Variable Name**
**File:** `backend/controllers/userCtr.js` (Line 68)  
**Severity:** MEDIUM  
**Description:** Variable name has typo.

```javascript
const passwordIsCorrrect = await bcrypt.compare(password, user.password);  // ❌ Extra 'r'
```

---

### 7. **Wrong Mongoose Schema Property**
**File:** `backend/model/userModel.js` (Lines 24, 28, 35, 40)  
**Severity:** MEDIUM  
**Description:** Using `require` instead of `required` in schema definitions.

```javascript
name: {
  type: String,
  require: [true, "Please add a name"],  // ❌ Should be "required"
}
```

**Impact:** Validation won't work as expected; fields won't be enforced as required.

---

### 8. **Inconsistent Image Upload Configuration**
**File:** `backend/routes/productRoute.js` (Line 22)  
**Severity:** MEDIUM  
**Description:** Update route uses `upload.single("image")` but controller expects multiple images.

```javascript
router.put("/:id", protect, isSeller, upload.single("image"), updateProduct);  // ❌ Single image
```

But in `productCtr.js` (Line 224):
```javascript
if (req.files && req.files.length > 0) {  // ✓ Expects multiple files
```

**Impact:** Image updates may fail or only upload one image when multiple are expected.

---

### 9. **Commented Out Code in Server.js**
**File:** `backend/server.js` (Line 45)  
**Severity:** LOW  
**Description:** Typo in comment.

```javascript
// Erro Middleware  // ❌ Should be "Error Middleware"
```

---

### 10. **Unused Function Export**
**File:** `backend/controllers/userCtr.js` (Line 11-13, 337)  
**Severity:** LOW  
**Description:** Test function `nik` is exported but serves no purpose.

```javascript
const nik = asyncHandler(async (req, res) => {
  res.send("nikheel");
})
```

**Impact:** Dead code that should be removed.

---

### 11. **Inconsistent Bid Validation Logic**
**File:** `backend/controllers/biddingCtr.js` (Lines 54-70)  
**Severity:** MEDIUM  
**Description:** First bid requires 10% increase, but subsequent bids only 2%. This is inconsistent and may not be intentional.

```javascript
const minimumFirstBid = product.basePrice * 1.1; // 10% higher
// vs
const minimumNextBid = highestBid.price * 1.02; // 2% higher
```

**Impact:** May allow bid manipulation or unfair bidding practices.

---

### 12. **Missing soldPrice Field in Product Model**
**File:** `backend/model/productModel.js`  
**Severity:** MEDIUM  
**Description:** The `sellProduct` function sets `product.soldPrice` but this field is not defined in the schema.

In `biddingCtr.js` (Line 144):
```javascript
product.soldPrice = finalPrice;
```

But the field is missing from the Product schema.

**Impact:** Data won't be saved properly; soldPrice will be lost.

---

### 13. **Duplicate sellProduct Functions**
**File:** `backend/controllers/productCtr.js` (Line 335) & `backend/controllers/biddingCtr.js` (Line 108)  
**Severity:** MEDIUM  
**Description:** Two different implementations of `sellProduct` exist with different logic.

**Impact:** Confusion about which function to use; inconsistent behavior.

---

### 14. **Deprecated Mongoose Options**
**File:** `backend/server.js` (Lines 55-57)  
**Severity:** LOW  
**Description:** Using deprecated Mongoose connection options.

```javascript
mongoose.connect(process.env.DATABASE_CLOUD, {
  useNewUrlParser: true,      // ❌ Deprecated in Mongoose 6+
  useUnifiedTopology: true,   // ❌ Deprecated in Mongoose 6+
})
```

**Impact:** Console warnings; may break in future Mongoose versions.

---

### 15. **Commented Out Validation Code**
**File:** `backend/controllers/biddingCtr.js` (Lines 118-123)  
**Severity:** MEDIUM  
**Description:** Important time-based validation is commented out.

```javascript
/* const currentTime = new Date();
  const tenMinutesAgo = new Date(currentTime - 2 * 60 * 1000);
  if (!product.isSoldout || product.updatedAt < tenMinutesAgo || product.createdAt < tenMinutesAgo) {
    return res.status(400).json({ error: "Product cannot be sold at this time" });
  } */
```

**Impact:** Products can be sold at any time without proper validation.

---

## 📊 Bug Summary

| Severity | Count |
|----------|-------|
| Critical | 4 |
| High     | 0 |
| Medium   | 9 |
| Low      | 2 |
| **Total** | **15** |

---

## 🔧 Recommended Actions

1. **Immediate:** Fix critical authentication bugs (#1, #2, #3, #4)
2. **High Priority:** Fix schema validation (#7) and balance deduction (#3)
3. **Medium Priority:** Fix typos, inconsistencies, and add missing schema fields
4. **Low Priority:** Clean up dead code and deprecated options

---

## 📝 Additional Notes

- The project has authentication issues from previous conversation history (authentication loop bug)
- Consider implementing comprehensive error logging
- Add unit tests for critical functions (authentication, bidding, payments)
- Implement transaction rollback for failed bid placements
- Add database transactions for financial operations

---

**Report Generated By:** Antigravity AI Code Analysis
