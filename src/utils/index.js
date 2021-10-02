export * from "./type";
export function random(min = 0, max) {
    return Math.floor(Math.random() * max) + min;
}