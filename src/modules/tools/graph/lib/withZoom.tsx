import { Zoom } from "@visx/zoom";
import { FunctionComponent, ReactElement } from "react";
import { useGraphStore } from "../graphStore";
import { ZoomType } from "../graphTools";

type ComponentProps<T = Record<string, unknown>> = T;

const initialTransform = {
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0,
};

export function withZoom<T = Record<string, unknown>>(
  Component: FunctionComponent<ComponentProps<T & { zoom: ZoomType }>>
): FunctionComponent<ComponentProps<T>> {
  return function ComponentWithZoom(props: T): ReactElement {
    const store = useGraphStore();
    return (
      <Zoom
        width={store.graphFieldSize.width}
        height={store.graphFieldSize.height}
        scaleXMin={0.1}
        scaleXMax={20}
        scaleYMin={0.1}
        scaleYMax={20}
        transformMatrix={initialTransform}
      >
        {(zoom) => <Component {...props} zoom={zoom} />}
      </Zoom>
    );
  };
}
