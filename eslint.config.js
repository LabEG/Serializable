import labegStyle from "@labeg/code-style";

/** @type {import("eslint").Linter.Config} */
export default [
    ...labegStyle,
    {
        rules: {
            // Ругается на reflect-metadata, удалить при переходе не нативные декораторы
            "@typescript-eslint/no-unsafe-type-assertion": "off"
        }
    }
];
