
declare module "*.json" { // fix for ts-node
    const value: any;
    export default value;
}
