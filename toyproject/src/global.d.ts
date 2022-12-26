declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.png" {}

declare module "*.md" {}