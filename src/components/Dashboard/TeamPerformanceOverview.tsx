const TeamPerformanceOverview = () => {
  const metrics = [
    {
      label: 'Team Members',
      value: '4',
      color: 'text-white',
    },
    {
      label: 'Total Contacts',
      value: '370',
      color: 'text-blue-400',
    },
    {
      label: 'Total Meetings',
      value: '74',
      color: 'text-green-400',
    },
    {
      label: 'Avg Conversion',
      value: '20%',
      color: 'text-purple-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-5 hover:shadow-md transition-all border border-gray-200"
        >
          <p className="text-gray-600 text-sm mb-2">{metric.label}</p>
          <p className={`text-2xl font-bold ${metric.color === 'text-white' ? 'text-gray-800' : metric.color}`}>{metric.value}</p>
        </div>
      ))}
    </div>
  )
}

export default TeamPerformanceOverview

