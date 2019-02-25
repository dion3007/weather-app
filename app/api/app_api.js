import FETCH from '../lib/FETCH'


export const listWeatherAPI = async (city) => {
    console.log(city)
    const response = await FETCH({
        method: 'POST',
        params: {
            q: city
        }
    })

    return response
}