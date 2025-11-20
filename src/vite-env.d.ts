/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import type { ComponentType, SVGProps } from "react";

declare module "*.svg" {
  const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
