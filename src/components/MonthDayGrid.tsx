const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// data: { [monthIndex: number]: { [day: number]: number } }
// colorScale: array of color classes, e.g. ['bg-gray-200', 'bg-green-200', ...]
export function MonthDayGrid({
  categoryMap = {},
  categories = [],
  onCellClick,
  selectedCat,
  defaultColor = 'bg-gray-200',
}: {
  categoryMap?: { [monthIndex: number]: { [day: number]: string } }
  categories?: { id: string; label: string; color: string }[]
  onCellClick?: (monthIdx: number, day: number, hasCategory: boolean) => void
  selectedCat?: string
  defaultColor?: string
}) {
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
            {MONTHS.map((m) => (
              <th
                key={m}
                className="text-[10px] font-semibold px-0.5 py-0 text-center w-4 h-4"
              >
                {m[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 31 }, (_, dayIdx) => (
            <tr key={dayIdx}>
              <td className="text-[10px] text-right pr-0 align-middle w-4 h-4 p-0 m-0">
                {dayIdx + 1}
              </td>
              {MONTHS.map((_, monthIdx) => {
                const catId = categoryMap[monthIdx]?.[dayIdx + 1]
                return (
                  <td
                    key={monthIdx}
                    className={`p-0.5`}
                    title={`Day ${dayIdx + 1}, ${MONTHS[monthIdx]}${catId ? `: ${catId}` : ''}`}
                    onClick={
                      onCellClick
                        ? () => onCellClick(monthIdx, dayIdx + 1, !!catId)
                        : undefined
                    }
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
