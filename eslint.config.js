import labegStyle from "@labeg/code-style";

/** @type {import("eslint").Linter.Config} */
export default [
    ...labegStyle,
    {
        rules: {
            // Drop usage reflect-metadata, use self store for metadata
            "@typescript-eslint/no-unsafe-type-assertion": "off"
        }
    }
];
