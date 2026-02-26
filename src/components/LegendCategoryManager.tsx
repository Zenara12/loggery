import { useState } from 'react'
import { Trash } from 'lucide-react'
import { useLoggeryStore } from '../store/useLoggeryStore'

export function LegendCategoryManager() {
  const [newLabel, setNewLabel] = useState('')
  const [newColor, setNewColor] = useState('#22c55e') // default green
  const categories = useLoggeryStore((state) => state.categories)
  const addCategory = useLoggeryStore((state) => state.addCategory)
  const updateCategory = useLoggeryStore((state) => state.updateCategory)
  const deleteCategory = useLoggeryStore((state) => state.deleteCategory)

  function handleAddCategory() {
    addCategory(newLabel, newColor)
    setNewLabel('')
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-1 justify-start">
        <input
          type="text"
          placeholder="Label"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="border rounded px-2 py-1 text-xs w-[3.5rem]"
        />
        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className="w-6 h-6 p-0 border-none"
        />
        <button
          onClick={handleAddCategory}
          className="bg-cyan-600 text-white px-2 py-1 rounded text-xs"
        >
          Add
        </button>
      </div>
      <ul className="space-y-1">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center gap-2">
            <input
              type="color"
              value={cat.color}
              onChange={(e) =>
                updateCategory(cat.id, cat.label, e.target.value)
              }
              className="w-5 h-5 border-none"
            />
            <input
              type="text"
              value={cat.label}
              onChange={(e) =>
                updateCategory(cat.id, e.target.value, cat.color)
              }
              className="border rounded px-1 py-0.5 text-xs w-20"
            />
            <button
              onClick={() => deleteCategory(cat.id)}
              className="text-xs text-red-500 hover:underline"
            >
              <Trash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LegendCategoryManager
