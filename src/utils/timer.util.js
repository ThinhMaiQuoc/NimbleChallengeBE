export const getRandomDelay = () => {
    const minDelay = 2000;
    const maxDelay = 5000;
    return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
};