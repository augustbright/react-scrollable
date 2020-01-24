import React, { ReactNode } from "react";

interface IScrollableOutput {
  isTopBelow: boolean;
  isBottomBelow: boolean;
  isTopAbove: boolean;
  isBottomAbove: boolean;
}

interface IScrollableProps {
  children: (state: IScrollableOutput) => ReactNode;
}

interface IScrollableState {
  y: number;
  height: number;
}

interface IViewportRect {
  height: number;
}

export default class Scrollable extends React.Component<
  IScrollableProps,
  IScrollableState
> {
  ref = React.createRef<HTMLDivElement>();

  constructor(props: IScrollableProps) {
    super(props);
    this.onWindowScroll = this.onWindowScroll.bind(this);
    this.state = this.getClientState();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onWindowScroll);
    this.updateClientState();
  }

  computeOutput(): IScrollableOutput {
    const { height: viewportHeight } = this.getViewportRect();

    return {
      isTopBelow: this.state.y >= viewportHeight,
      isBottomBelow: this.state.y + this.state.height >= viewportHeight,
      isTopAbove: this.state.y < 0,
      isBottomAbove: this.state.y + this.state.height < 0
    };
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onWindowScroll);
  }

  onWindowScroll(event: Event) {
    this.updateClientState();
  }

  updateClientState(): void {
    this.setState(this.getClientState());
  }

  getClientState(): IScrollableState {
    return {
      y: this.getClienY() || 0,
      height: this.getClientHeight() || 0
    };
  }

  getClienY() {
    return this.ref.current?.getBoundingClientRect().y;
  }

  getClientHeight() {
    return this.ref.current?.getBoundingClientRect().height;
  }

  getViewportRect(): IViewportRect {
    return {
      height: typeof window === 'undefined' ? 0 : window.innerHeight
    };
  }

  render() {
    const {children, ...rest } = this.props;
    return <div style={{display: 'content'}} ref={this.ref} {...rest}>{this.props.children(this.computeOutput())}</div>;
  }
}
