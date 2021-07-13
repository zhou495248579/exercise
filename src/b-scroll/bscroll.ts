interface ScrollOption extends Record<string, any>{
  scrollX: boolean;
  scrollY: boolean;
}
export const DefaultOption = {
  scrollY: true,
  scrollX: false,
};
export class BScroll {
  touch: {
    x: number;
    y: number;
    beginX?: number;
    beginY?: number;
  } = { x: 0, y: 0 };

  private readonly contentEl: HTMLElement | null = null;
  private touching = false;
  private option: ScrollOption | null = null;
  constructor(el: string | HTMLElement | null, option: ScrollOption) {
    if (!el) {
      return;
    }
    this.option = option
      ? {
          ...DefaultOption,
          ...option,
        }
      : DefaultOption;
    if (typeof el === "string") {
    } else {
      console.log(el, "el============");
      const child = el.children;
      const content = child[0];
      if (!content) {
        console.error("content 为空");
        return;
      }
      this.contentEl = content as HTMLElement;
      content.addEventListener(
        "touchstart",
        (e) => {
          console.log("touchstart", e);
          this.touching = true;
          this.touch.x = 0;
          this.touch.y = 0;
          const touches = (e as TouchEvent).touches;
          if (this.option?.scrollX) {
            this.touch.beginX = touches[0].pageX;
          }
          if (this.option?.scrollY) {
            this.touch.beginY = touches[0].pageY;
          }
        },
        false
      );
      content.addEventListener(
        "touchmove",
        (e) => {
          console.log("touchmove", e);
          if (!this.touching) {
            return;
          }
          const { beginY = 0, beginX = 0, x, y } = this.touch;
          const touches = (e as TouchEvent).touches;
          const { pageX, pageY } = touches[0];
          if (this.option?.scrollY) {
            this.touch.y = pageY - beginY;
          }
          if (this.option?.scrollX) {
            this.touch.x = pageX - beginX;
          }

          if (this.contentEl) {
            // transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
            // transition-property: transform;
            // transition-duration: 0ms;
            this.contentEl.style.transform = ` translateX(${
              this.touch.x || 0
            }px) translateY(${this.touch.y || 0}px) translateZ(0px)`;
          }
        },
        false
      );
      content.addEventListener(
        "touchend",
        (e) => {
          console.log("touchend", e);
          this.touching = false;
        },
        false
      );
    }
  }
}
