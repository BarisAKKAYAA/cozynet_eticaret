export interface CategoryDTO {
  id: number;             // Kategorinin benzersiz ID'si
  name: string;           // Kategorinin adı
  description?: string;  // Kategorinin açıklaması
  imageUrl?: string;      // Kategorinin resmi
}
