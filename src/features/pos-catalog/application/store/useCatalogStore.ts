import { create } from "zustand";
import type { CatalogItem } from "../../domain/entities/CatalogItem";
import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import type { ICatalogRepository } from "../../domain/repositories/ICatalogRepository";

interface CatalogState {
  items: CatalogItem[];
  isLoading: boolean;
  error: string | null;
  fetchCatalog: () => Promise<void>;
  filteredItems: (search: string, categoryId: number | null) => CatalogItem[];
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchCatalog: async () => {
    set({ isLoading: true, error: null });
    try {
      // Obtenemos el repositorio desde el contenedor de Inversify
      const repository = container.get<ICatalogRepository>(
        TYPES.ICatalogRepository,
      );
      const items = await repository.getCatalog();
      console.log("Fetched catalog items:", items);
      set({ items, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch catalog",
        isLoading: false,
      });
    }
  },

  filteredItems: (search: string, categoryId: number | null) => {
    const { items } = get();
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryId
        ? item.categoryId === categoryId
        : true;
      return matchesSearch && matchesCategory;
    });
  },
}));
