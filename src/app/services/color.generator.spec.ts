import { ColorGeneratorService } from './color-generator.service'
describe('ColorGeneratorService tests', () => {
    let colorGeneratorService: ColorGeneratorService;

    it('#generateColors should return the list of colors', () => {
        colorGeneratorService = new ColorGeneratorService();
        const expectedColors: string[] = ['rgb(254, 75, 131)', 'rgb(82, 246, 103)']
        expect(colorGeneratorService.generateColors(2, 'Rainbow')).toEqual(expectedColors);
    });

});