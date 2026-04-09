import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SeriesOption } from '../components/DocumentSeriesSwitch/types';

interface PosSettingsState {
  activeSeries: SeriesOption | null;
  setActiveSeries: (series: SeriesOption) => void;
}

export const usePosSettingsStore = create<PosSettingsState>()(
  persist(
    (set) => ({
      activeSeries: null,
      setActiveSeries: (series) => set({ activeSeries: series }),
    }),
    {
      name: 'pos-settings-storage',
    }
  )
);
