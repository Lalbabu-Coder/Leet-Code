// Median of Two Sorted Arrays

// Binary search approach — O(log(min(m,n))) time, jo O(log(m+n)) se bhi better constraint satisfy karta hai.

// Idea (Hinglish mein): Chhote array pe binary search karo partition point ke liye. Dono arrays ko is tarah do parts mein baato ki left part ke saare elements right part ke saare elements se chhote (ya equal) ho. Agar aisa partition mil gaya, toh median seedha left-max aur right-min se nikal sakte ho.


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // Hamesha chhote array pe binary search karo — time complexity optimal rehti hai
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const m = nums1.length;
    const n = nums2.length;
    const totalLeft = Math.floor((m + n + 1) / 2); // left half mein kitne elements chahiye

    let low = 0, high = m;

    while (low <= high) {
        const cut1 = Math.floor((low + high) / 2); // nums1 se kitne elements left mein
        const cut2 = totalLeft - cut1;              // nums2 se kitne elements left mein

        // Left aur right boundary values nikaalo
        const left1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
        const left2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
        const right1 = cut1 === m ? Infinity : nums1[cut1];
        const right2 = cut2 === n ? Infinity : nums2[cut2];

        // Valid partition check: left ke saare elements <= right ke saare elements
        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2 === 0) {
                return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
            } else {
                return Math.max(left1, left2);
            }
        } else if (left1 > right2) {
            // cut1 bahut aage chala gaya, peeche jao
            high = cut1 - 1;
        } else {
            // cut1 aur aage badhao
            low = cut1 + 1;
        }
    }

    // Agar arrays sorted hain to yahan tak nahi aana chahiye
    throw new Error("Input arrays are not sorted");
};


console.log(findMedianSortedArrays([1,3], [2]));    // 2.00000
console.log(findMedianSortedArrays([1,2], [3,4]));  // 2.50000

