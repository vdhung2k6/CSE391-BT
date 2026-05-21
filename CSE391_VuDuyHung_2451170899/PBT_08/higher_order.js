// 1. pipe()
const pipe = (...fns) => (val) => fns.reduce((acc, fn) => fn(acc), val);

// 2. memoize()
function memoize(fn) {
    const cache = {};
    return (...args) => {
        const key = JSON.stringify(args);
        if (key in cache) return cache[key];
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// 3. debounce()
function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

// 4. retry()
async function retry(fn, maxAttempts = 3) {
    for (let i = 0; i < maxAttempts; i++) {
        try { return await fn(); }
        catch (err) { if (i === maxAttempts - 1) throw err; }
    }
}