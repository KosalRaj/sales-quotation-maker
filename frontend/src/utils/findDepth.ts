export default const function findDepth(obj: any, currentDepth: number = 0, maxDepth: number = 0): number {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                maxDepth = Math.max(maxDepth, findDepth(obj[key], currentDepth + 1));
            } else {
                maxDepth = Math.max(maxDepth, currentDepth);
            }
        }
    }
    return maxDepth;
}
