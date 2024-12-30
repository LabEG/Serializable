/* eslint-disable init-declarations */

declare module "*.json" {
    const value: Record<string, unknown>;
    export default value;
}
