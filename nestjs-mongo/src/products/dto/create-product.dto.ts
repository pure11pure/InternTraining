// ประกาศการรูปแบบในการรับข้อมูล

export class CreateProductDto {
  readonly name: string;
  readonly description?: string;
  readonly price: number;
}
