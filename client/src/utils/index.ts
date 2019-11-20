export const pad = (value: number): string => {
    return value < 10 ? value.toString().padStart(2, '0') : value.toString();
};
