export const pad = (value: number): string => {
    return value < 10 ? value.toString().padStart(2, '0') : value.toString();
};

export const getTimeString = (currentTime: number): string => {
    const curMinutes: number = Math.floor(currentTime / 60);
    const curSeconds = Math.floor(currentTime - curMinutes * 60);

    const defaultTime = '00:00';

    if (isNaN(curMinutes) || isNaN(curSeconds)) {
        return defaultTime;
    }

    return pad(curMinutes) + ':' + pad(curSeconds);
};

export const getValueInBetween = (
    value: number,
    min: number,
    max: number,
): number => {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
};
