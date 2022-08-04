export interface OptionProps {
    code: string;
    content: string;
}

export interface PointProps {
    pageX: number;
    pageY: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ConfigProps {
    config: {
        question?: string;
        instruction?: string;
        options: Array<{
            code: string;
            content: string;
        }>;
    };
}

/**
 * 当前点位是否包含了 storageCabinet这个组件里的element
 * @param {number} x pageX
 * @param {number} y pageY
 * @returns {boolean}
 */
export const hasStorageEl = (x: number, y: number): boolean => {
    const els = document.elementsFromPoint(x, y);

    let status = false;
    for (let i = 0; i < els.length; ) {
        const el = els[i];
        const classAttr = el.getAttribute("class")?.split(" ") ?? [];

        const overOnStorage = classAttr.includes("storageCabinet_container");
        if (overOnStorage) {
            status = true;
            i = els.length;
        } else {
            ++i;
        }
    }
    return status;
};

/**
 * 画圆角矩形
 */

export const drawRoundRect = (el: HTMLCanvasElement): undefined => {
    const initDraw = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        isStroke?: boolean,
    ) => {
        ctx.beginPath();
        const r = 6;
        const stroke = isStroke ? 1.2 : 0;
        const startX = stroke;
        const startY = stroke;
        const endX = width - stroke;
        const endY = height - stroke;
        ctx.lineJoin = "round";
        ctx.arc(endX - r, endY - r, r, 0, Math.PI / 2);
        ctx.lineTo(r + startX, endY);
        ctx.arc(startX + r, endY - r, r, Math.PI / 2, Math.PI);
        ctx.lineTo(startX, startY + r);
        ctx.arc(startX + r, startY + r, r, Math.PI, (Math.PI / 2) * 3);
        ctx.lineTo(endX - r, startY);
        ctx.arc(endX - r, startY + r, r, (Math.PI / 2) * 3, Math.PI * 2);
        ctx.lineTo(endX, endY - r);
    };

    const parent = el.parentElement;

    let width = 0;
    let height = 0;
    if (parent instanceof HTMLElement) {
        width = parent.offsetWidth;
        height = parent.offsetHeight;
    }

    const ctx = el.getContext("2d");

    if (!ctx) {
        return;
    }

    ctx.clearRect(0, 0, el.width, el.height);
    el.width = width;
    el.height = height;

    initDraw(ctx, width, height, false);
    const bg = ctx.createLinearGradient(-14, -12.5, width, height - 4);
    bg.addColorStop(0, "rgba(87,241,241,0.36)");
    bg.addColorStop(1, "rgba(0,69,166,0.4)");

    ctx.fillStyle = bg;
    ctx.fill();
    ctx.closePath();

    initDraw(ctx, width, height, true);
    const strokeStyle = ctx.createLinearGradient(4.5, -3.5, width + 13, height + 11.5);
    strokeStyle.addColorStop(0, "#57F1F1");
    strokeStyle.addColorStop(1, "#007EFE");
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
    ctx.closePath();
};
