
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
