import { useLoggeryStore } from '../store/useLoggeryStore'

const MONTHS_DAYS = [
  {
    month: 'Jan',
    days: 31,
  },
  {
    month: 'Feb',
    days: 29,
  },
  {
    month: 'Mar',
    days: 31,
  },
  {
    month: 'Apr',
    days: 30,
  },
  {
    month: 'May',
    days: 31,
  },
  { month: 'Jun', days: 30 },
  { month: 'Jul', days: 31 },
  { month: 'Aug', days: 31 },
  { month: 'Sep', days: 30 },
  { month: 'Oct', days: 31 },
  { month: 'Nov', days: 30 },
  { month: 'Dec', days: 31 },
]

const MAX_DAYS = Math.max(...MONTHS_DAYS.map((m) => m.days))

export function MonthDayGrid({ defaultColor = 'bg-gray-200' }: { defaultColor?: string }) {
  const categoryMap = useLoggeryStore((state) => state.categoryMap)
  const categories = useLoggeryStore((state) => state.categories)
  const selectedCat = useLoggeryStore((state) => state.selectedCat)
  const toggleCell = useLoggeryStore((state) => state.toggleCell)

  // Helper to get color for a category id
  const getStyle = (catId?: string) => {
    if (!catId) return { background: undefined }
    const cat = categories.find((c) => c.id === catId)
    return cat ? { background: cat.color } : {}
  }
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse select-none">
        <thead>
          <tr>
            <th className="w-4 h-4 p-0 m-0"></th>
            {MONTHS_DAYS.map((m, monthIdx) => (
              <th
                key={monthIdx}
                className="text-[10px] font-semibold px-0.5 py-0 text-center w-4 h-4"
              >
                {m.month[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: MAX_DAYS }, (_, dayIdx) => (
            <tr key={dayIdx}>
              <td className="text-[10px] text-right pr-0 align-middle w-4 h-4 p-0 m-0">
                {dayIdx + 1}
              </td>
              {MONTHS_DAYS.map((monthData, monthIdx) => {
                if (dayIdx + 1 > monthData.days) {
                  return <td key={monthIdx} className="p-0.5" />
                }
                const catId = categoryMap[monthIdx]?.[dayIdx + 1]
                return (
                  <td
                    key={monthIdx}
                    className={`p-0.5`}
                    title={`Day ${dayIdx + 1}, ${monthData.month}${catId ? `: ${catId}` : ''}`}
                    onClick={() => toggleCell(monthIdx, dayIdx + 1)}
                  >
                    <div
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded border border-transparent hover:border-gray-400 transition-colors p-0 m-0 ${!catId ? defaultColor : ''} ${selectedCat && catId === selectedCat ? 'ring-2 ring-cyan-400' : ''}`}
                      style={getStyle(catId)}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MonthDayGrid
