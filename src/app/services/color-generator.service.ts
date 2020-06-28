import { Injectable } from '@angular/core';
import * as d3 from 'd3';
const colorRangeInfo = {
    colorStart: 0.2,
    colorEnd: 1,
    useEndAsStart: false,
};
export const ColorInterpolate = Object.freeze({
    Rainbow: d3.interpolateRainbow,
    RdPu: d3.interpolateRdPu,
    YlGn: d3.interpolateYlGn,
    Spectral: d3.interpolateSpectral,
    Cool: d3.interpolateCool,
});

@Injectable({
    providedIn: 'root',
})
export class ColorGeneratorService {
    constructor() { }

    protected calculateColorPoint(i, intervalSize, colorRangeInfo): number {
        const { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
        return useEndAsStart
            ? colorEnd - i * intervalSize
            : colorStart + i * intervalSize;
    }

    public generateColors(dataLength: number, colorScaleOption: string): string[] {
        const colorOption = ColorInterpolate.hasOwnProperty(colorScaleOption)
            ? colorScaleOption
            : 'Rainbow';
        const { colorStart, colorEnd } = colorRangeInfo;
        const colorRange = colorEnd - colorStart;
        const intervalSize = colorRange / dataLength;
        let i: number, colorPoint: number;
        let colorArray: string[] = [];
        for (i = 0; i < dataLength; i++) {
            colorPoint = this.calculateColorPoint(i, intervalSize, colorRangeInfo);
            colorArray.push(ColorInterpolate[colorOption](colorPoint));
        }
        return colorArray;
    }
}
