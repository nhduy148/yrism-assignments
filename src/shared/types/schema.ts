import { DataImage, Position, ToolLanguage } from './common';
import { Employee } from './employee';

export type DataImageSchema = {
  id?: DataImage['id'];
  data: File;
  displayOrder: number;
  cdnUrl?: string;
};
export type ToolLanguageSchema = Omit<ToolLanguage, 'id' | 'images'> & {
  images: DataImageSchema[];
};
export type PositionSchema = Omit<Position, 'id' | 'toolLanguages'> & {
  toolLanguages: ToolLanguageSchema[];
};
export type EmployeeSchema = Omit<Employee, 'id' | 'positions'> & {
  positions: PositionSchema[];
};
