import { listWeatherAPI } from '../../api/app_api'

export const listWeather = (ctx) => async (dispatch, getState) => {
    const { city } = ctx
    let res
    res = await listWeatherAPI({ ctx: city })  
    dispatch({ type: 'FETCH_WEATHER', payload: res.data })
    console.log(res.data)
    return res.data
  }