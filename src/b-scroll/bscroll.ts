interface ScrollOption extends Record<string, any> {
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
  private maxScrollY = 0;
  private maxScrollX = 0;
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
      const child = el.children;
      const content = child[0];
      if (!content) {
        console.error("content 为空");
        return;
      }
      this.contentEl = content as HTMLElement;
      if (this.option.scrollX) {
        setTimeout(() => {
          this.maxScrollX = this.contentEl.scrollWidth - el.clientWidth;
        });
      }
      if (this.option.scrollY) {
        setTimeout(() => {
          this.maxScrollY = this.contentEl.scrollHeight - el.clientHeight;
          console.log(this.maxScrollY);
        });
      }
      content.addEventListener(
        "touchstart",
        (e) => {
          this.touching = true;
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
          if (!this.touching) {
            return;
          }
          const { beginY = 0, beginX = 0, x, y } = this.touch;
          const touches = (e as TouchEvent).touches;
          const { pageX, pageY } = touches[0];
          let newX, newY;
          if (this.option?.scrollY) {
            let delta = pageY - beginY;
            if (delta > 0 || delta < -1 * this.maxScrollY) {
              delta = delta / 3;
            }
            console.log("touchy", this.touch.y, delta, beginY);
            newY = this.touch.y + delta;
          }
          if (this.option?.scrollX) {
            let delta = pageX - beginX;
            if (delta > 0 || delta < -1 * this.maxScrollX) {
              delta = delta / 3;
            }
            newX = this.touch.x + delta;
          }
          this.translate(newX || 0, newY || 0);
        },
        false
      );
      content.addEventListener(
        "touchend",
        (e) => {
          console.log("touchend", e);
          this.touching = false;
          this.resetPointer(this.touch.y, this.touch.x);
        },
        false
      );
    }
  }

  private translate(x: number, y: number) {
    if (this.contentEl) {
      // transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      // transition-property: transform;
      // transition-duration: 0ms;
      this.contentEl.style.transform = ` translateX(${x}px) translateY(${y}px) translateZ(0px)`;
      this.touch.x = x;
        console.log('y',y)
      this.touch.y = y;
    }
  }

  private resetPointer(pageY: number, pageX: number) {
    let x, y;
    if (this.option?.scrollY) {
      let delta = pageY - (this.touch.beginY || 0);
      if (delta > 0) {
        y = 0;
      } else if (delta < -1 * this.maxScrollY) {
        y = -1 * this.maxScrollY;
      }
      // if (y && this.contentEl) {
      //   this.contentEl.style.transform = ` translateY(${
      //     this.touch.y || 0
      //   }px) translateZ(0px)`;
      // }
    }
    if (this.option?.scrollX) {
      let delta = pageX - (this.touch.beginX || 0);
      if (delta > 0) {
        x = 0;
      } else if (delta < -1 * this.maxScrollX) {
        x = -1 * this.maxScrollX;
      }
    }
    if (x === this.touch.x && this.touch.y === y) {
      return true;
    }
    this.translate(x || 0, y || 0);
  }
}
