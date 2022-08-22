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

export const drawRoundRect = (el: HTMLCanvasElement, type: "top" | "bottom"): undefined => {
    const parent = el.parentElement;
    let width = 0;
    let height = 0;
    if (parent instanceof HTMLElement) {
        width = parent.offsetWidth;
        height = parent.offsetHeight;
    }

    const r = 12;

    const ctx = el.getContext("2d");
    if (!ctx) {
        return;
    }

    ctx.clearRect(0, 0, el.width, el.height);
    el.width = width;
    el.height = height;

    ctx.beginPath();

    ctx.lineJoin = "round";
    ctx.lineWidth = 1;

    const color =
        type == "top"
            ? ctx.createLinearGradient(15, -3, width * 0.895, height * 0.948)
            : ctx.createLinearGradient(30, -6, width * 0.895, height * 0.936);
    color.addColorStop(0, "rgba(255,255,255,0.5)");
    color.addColorStop(0.4, "rgba(255,255,255,0)");
    color.addColorStop(0.7, "rgba(75,243,254,0.34)");
    color.addColorStop(1, "rgba(14,193,204,0.8)");
    ctx.strokeStyle = color;

    ctx.arc(width - r, height - r, r, 0, Math.PI / 2);
    ctx.lineTo(r, height);
    ctx.arc(r, height - r, r, Math.PI / 2, Math.PI);
    ctx.lineTo(0, r);
    ctx.arc(r, r, r, Math.PI, (Math.PI / 2) * 3);
    ctx.lineTo(width - r, 0);
    ctx.arc(width - r, r, r, (Math.PI / 2) * 3, Math.PI * 2);

    ctx.closePath();
    ctx.stroke();
};
