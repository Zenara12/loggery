import { createFileRoute } from '@tanstack/react-router'

import MonthDayGrid from '../components/MonthDayGrid'
import LegendCategoryManager from '../components/LegendCategoryManager'
import { useLoggeryStore } from '../store/useLoggeryStore'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const categories = useLoggeryStore((state) => state.categories)
  const selectedCat = useLoggeryStore((state) => state.selectedCat)
  const setSelectedCat = useLoggeryStore((state) => state.setSelectedCat)

  return (
    <div className="text-center flex flex-col items-center gap-2">
      <h2 className="text-2xl font-bold mb-4">Month Day Grid Example</h2>
      <div className="flex flex-row gap-2 w-full justify-center">
        <div>
          <MonthDayGrid defaultColor="bg-gray-200" />
        </div>
        <div className="border border-red-500 rounded p-1 mr-1 min-w-[120px] flex flex-col gap-2">
          <LegendCategoryManager />
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
