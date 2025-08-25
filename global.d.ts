// Allow importing jsx into tsx
declare module '*.jsx' {
    var _: () => any;
    export default _;
}
