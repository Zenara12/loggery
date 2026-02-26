import { create } from 'zustand'

export type Category = {
  id: string
  label: string
  color: string
}

export type CategoryMap = {
  [monthIdx: number]: { [day: number]: string }
}

type LoggeryState = {
  categories: Category[]
  categoryMap: CategoryMap
  selectedCat: string
  setSelectedCat: (catId: string) => void
  toggleCell: (monthIdx: number, day: number) => void
  addCategory: (label: string, color: string) => void
  updateCategory: (id: string, label: string, color: string) => void
  deleteCategory: (id: string) => void
}

export const useLoggeryStore = create<LoggeryState>((set) => ({
  categories: [
    { id: 'cat1', label: 'Work', color: '#22c55e' },
    { id: 'cat2', label: 'Play', color: '#3b82f6' },
  ],
  categoryMap: {
    0: { 1: 'cat1', 2: 'cat1' },
    1: { 15: 'cat2' },
  },
  selectedCat: 'cat1',
  setSelectedCat: (catId) => set({ selectedCat: catId }),
  toggleCell: (monthIdx, day) =>
    set((state) => {
      const month = { ...(state.categoryMap[monthIdx] || {}) }
      if (month[day]) {
        delete month[day]
      } else if (state.selectedCat) {
        month[day] = state.selectedCat
      }
      return {
        categoryMap: {
          ...state.categoryMap,
          [monthIdx]: month,
        },
      }
    }),
  addCategory: (label, color) =>
    set((state) => {
      if (!label.trim()) return state
      return {
        categories: [
          ...state.categories,
          { id: Date.now().toString(), label: label.trim(), color },
        ],
      }
    }),
  updateCategory: (id, label, color) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === id ? { ...cat, label, color } : cat,
      ),
    })),
  deleteCategory: (id) =>
    set((state) => {
      const nextCategories = state.categories.filter((cat) => cat.id !== id)
      const validIds = new Set(nextCategories.map((cat) => cat.id))
      const nextMap: CategoryMap = {}

      for (const m in state.categoryMap) {
        nextMap[m] = {}
        for (const d in state.categoryMap[m]) {
          const categoryId = state.categoryMap[m][d]
          if (validIds.has(categoryId)) {
            nextMap[m][d] = categoryId
          }
        }
      }

      return {
        categories: nextCategories,
        categoryMap: nextMap,
        selectedCat:
          state.selectedCat === id ? (nextCategories[0]?.id ?? '') : state.selectedCat,
      }
    }),
}))
