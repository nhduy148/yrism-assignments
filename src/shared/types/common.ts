export interface Position {
  id: number;
  positionResourceId: number;
  displayOrder: number;
  toolLanguages: ToolLanguage[];
}

export interface ToolLanguage {
  id: number;
  toolLanguageResourceId: number;
  displayOrder: number;
  from: number;
  to: number;
  description?: string;
  images: DataImage[];
}

export interface DataImage {
  id: number;
  cdnUrl: string;
  displayOrder: number;
}

export type ToolLanguageResources = {
  toolLanguageResourceId: number;
  positionResourceId: number;
  name: string;
};

export interface PositionResource {
  positionResourceId: number;
  name: string;
  toolLanguageResources: ToolLanguageResources[];
}
