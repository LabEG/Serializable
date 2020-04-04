/* eslint-disable init-declarations */

declare module "*.json" { // fix for ts-node
    const value: object;
    export default value;
}
