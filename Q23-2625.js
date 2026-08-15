// ==========================================
// LeetCode 2625. Flatten Deeply Nested Array
// Difficulty: Medium
// ==========================================
//
//  QUESTION DESCRIPTION:
// Given a multi-dimensional array `arr` and a depth `n`, return a flattened version of that array.
// 
// A multi-dimensional array is a recursive data structure that contains integers or other multi-dimensional arrays.
// 
// A flattened array is a version of that array with some or all of the sub-arrays removed and replaced 
// with the actual elements in that sub-array. This flattening operation should only be done if the 
// current depth of nesting is less than n. The depth of the elements in the first array are considered to be 0.
// 
// Note: Solve it WITHOUT using the built-in Array.prototype.flat method.
//
// ------------------------------------------
//  EXAMPLES:
//
// Example 1:
// Input: arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 0
// Output: [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
// Explanation: Passing depth n=0 means NO subarrays are flattened.
//
// Example 2:
// Input: arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 1
// Output: [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]
// Explanation: Subarrays at depth 0 ([4,5,6], [7,8,...], [13,14,15]) are flattened 1 level down.
// [9, 10, 11] is at depth 1, so it stays unflattened because depth limit (n=1) is reached.
//
// Example 3:
// Input: arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 2
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
// Explanation: Maximum nesting depth is 2, and n=2, so ALL elements are fully flattened.
//
// ------------------------------------------
//  CONSTRAINTS:
// - 0 <= count of numbers in arr <= 10^5
// - 0 <= count of subarrays in arr <= 10^5
// - maxDepth <= 1000
// - -1000 <= element value <= 1000
// - 0 <= n <= 1000
//
// ==========================================
//  REVISION & SOLUTION EXPLANATION (Hinglish):
// ==========================================
//  MAIN CONCEPT (Approach):
// 1. Array Flattening ka matlab nested arrays (jaise [[1, 2], 3]) ke andar se 
//    elements ko nikaal kar ek single flat array me laana.
// 2. Par yahan depth limit `n` di gayi hai:
//    - Agar `n === 0`, flattening stop kar do.
//    - Agar `n > 0` and element ek Array hai (`Array.isArray(item)`), toh recursive 
//      call maaro with `n - 1`.
//    - Agar element normal number/value hai (Array nahi hai), toh use direct result me push kar do.
//
//  STEP-BY-STEP RECURSIVE LOGIC:
// 1. Ek empty `result` array banao.
// 2. `arr` ke har element par loop chalao (`for (const item of arr)`):
//    - Check karo: Kya `item` ek Array hai AND `n > 0` hai?
//      -> Agar YES: `flat(item, n - 1)` ko call karo (depth 1 kam ho jayegi) aur uske returned elements ko spread (`...`) karke `result` me push kar do.
//      -> Agar NO: direct `item` ko `result.push(item)` kar do.
// 3. Final `result` array return kar do.
//
// COMPLEXITY ANALYSIS:
// - Time Complexity: O(N) -> Har element ko maximum 1 baar process kiya jata hai (N = total elements).
// - Space Complexity: O(D + N) -> Recursion stack depth D + result array size N.
// ==========================================

/**
 * @param {Array} arr
 * @param {number} n
 * @return {Array}
 */
var flat = function(arr, n) {
    // Result array to store the flattened elements
    const result = [];
    
    for (const item of arr) {
        // Condition: If item is an array AND depth limit 'n' is greater than 0
        if (Array.isArray(item) && n > 0) {
            // Recursively call flat for nested array with depth reduced by 1 (n - 1)
            // Spread operator (...) adds all returned flattened items into result
            result.push(...flat(item, n - 1));
        } else {
            // If item is not an array OR depth limit n == 0, push item directly
            result.push(item);
        }
    }
    
    return result;
};
