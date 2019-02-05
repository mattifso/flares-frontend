import flareService from '../services/flareService'

const reducer = (store = null, action) => {
  if (action.type === 'INIT_FLARES') {
    const regionArr = getTopRegionsByActivity(action.data, 5)
    const mostCommonClass = getMostCommonClass(action.data)
    return { activityCounts: regionArr, mostCommonClass: mostCommonClass }
  }
  return store
}

function getTopRegionsByActivity(data, limit) {
  const activitySums = data
    .map(f => !f.activeRegionNum ? { ...f, activeRegionNum: 'Unknown' } : f) // for 'null' regions
    .reduce((prev, current) => {
      prev[current.activeRegionNum] = 1 + (prev[current.activeRegionNum] || 0)
      return prev
    }, {})

  const regionActivitySumArray = []
  Object.entries(activitySums)
    .forEach(f => regionActivitySumArray.push({ region: f[0], count: f[1] }))

  regionActivitySumArray.sort((a, b) => {
    return b.count - a.count
  })
  return regionActivitySumArray.slice(0, limit)
}

function getMostCommonClass(data) {
  const classTotals = data.reduce((totals, f) => (
    { ...totals, [f.classType]: (totals[f.classType] || 0) + 1 }
  ), {})
  const mostCommonClass = Object.entries(classTotals).reduce((max, pair) => pair[1] > max[1] ? pair : max, ['', 0])
  return mostCommonClass[0]
}

export const initFlares = () => {
  return async (dispatch) => {
    try {
      const flareData = await flareService.getFlares(2016)
      dispatch({
        type: 'INIT_FLARES',
        data: flareData
      })
    } catch (error) {
      console.log('Error', error)
    }
  }
}
export default reducer