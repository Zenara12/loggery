import { createFileRoute } from '@tanstack/react-router'

import MonthDayGrid from '../components/MonthDayGrid'
import LegendCategoryManager from '../components/LegendCategoryManager'
import type { Category } from '../components/LegendCategoryManager'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  // Categories state
  const [categories, setCategories] = useState<Category[]>([
    { id: 'cat1', label: 'Work', color: '#22c55e' },
    { id: 'cat2', label: 'Play', color: '#3b82f6' },
  ])
  // categoryMap: { [monthIdx]: { [day]: categoryId } }
  const [categoryMap, setCategoryMap] = useState<{
    [monthIdx: number]: { [day: number]: string }
  }>({
    0: { 1: 'cat1', 2: 'cat1' },
    1: { 15: 'cat2' },
  })
  // Selected category for assignment
  const [selectedCat, setSelectedCat] = useState<string>('cat1')

  // Toggle category on cell click: assign if none, remove if present
  function handleCellClick(
    monthIdx: number,
    day: number,
    hasCategory: boolean,
  ) {
    setCategoryMap((prev) => {
      const month = { ...(prev[monthIdx] || {}) }
      if (hasCategory) {
        delete month[day]
      } else if (selectedCat) {
        month[day] = selectedCat
      }
      return { ...prev, [monthIdx]: month }
    })
  }

  // Remove category from grid if deleted
  function handleCategoriesChange(newCats: Category[]) {
    setCategories(newCats)
    const validIds = new Set(newCats.map((c) => c.id))
    setCategoryMap((prev) => {
      const newMap: typeof prev = {}
      for (const m in prev) {
        newMap[m] = {}
        for (const d in prev[m]) {
          if (validIds.has(prev[m][d])) newMap[m][d] = prev[m][d]
        }
      }
      return newMap
    })
    // If selectedCat was deleted, pick another
    if (!newCats.find((c) => c.id === selectedCat) && newCats.length > 0) {
      setSelectedCat(newCats[0].id)
    }
  }

  return (
    <div className="text-center flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold mb-4">Month Day Grid Example</h2>
      <div className="flex flex-row gap-1 w-full justify-center">
        <div>
          <MonthDayGrid
            categoryMap={categoryMap}
            categories={categories}
            defaultColor="bg-gray-200"
            onCellClick={handleCellClick}
            selectedCat={selectedCat}
          />
        </div>
        <div className="border border-red-500 rounded p-1 mr-1 min-w-[120px] flex flex-col gap-2">
          <LegendCategoryManager
            categories={categories}
            setCategories={handleCategoriesChange}
          />
          <div className="flex flex-col gap-1 mt-2">
            <span className="font-semibold text-xs mb-1">
              Select category to assign:
            </span>
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`px-2 py-1 rounded text-xs border ${selectedCat === cat.id ? 'border-cyan-600 ring-2 ring-cyan-300' : 'border-gray-300'} flex items-center gap-1`}
                  style={{ background: cat.color }}
                  onClick={() => setSelectedCat(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Tip: Left click to assign n remove.
          </p>
        </div>
      </div>
    </div>
  )
}
