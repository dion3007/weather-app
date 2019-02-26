import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Input, OutlinedInput, FilledInput, InputLabel, MenuItem, FormHelperText, FormControl, Select, Paper } from '@material-ui/core';
import WeatherCard from '../components/card/index.js'
import { listWeatherAPI } from '../app/api/app_api';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
};

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weatherResponse: [],
      city: 'Jakarta',
      error: '',
      icon: '',
      suhu: '',
      date: '',
      wind: '',
      title: '',
      initialLoading: true,
    }
  }

  async componentDidMount() {
    this.getWeather()
  }

  async getWeather() {
    try {
      const listWeathers = await listWeatherAPI(this.state.city)
      if (listWeathers.status !== 200) throw Error()
      this.setState({
        weatherResponse: listWeathers.data,
        icon: listWeathers.data.current.condition.icon,
        suhu: listWeathers.data.current.feelslike_c,
        date: listWeathers.data.current.last_updated,
        wind: listWeathers.data.current.wind_mph,
        title: listWeathers.data.current.condition.text,
      })
    } catch (e) {
      this.setState({ error: 'Terjadi kesalahan pada saat memuat data' })
    }
    this.setState({ initialLoading: false })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.getWeather()
  };

  render() {
    const { city, icon, suhu, wind, date, title, weatherResponse } = this.state
    console.log(weatherResponse)
    return (
      <Paper>
        <FormControl>
          <InputLabel htmlFor="city">City</InputLabel>
          <Select
            value={this.state.city}
            onChange={(e) => this.handleChange(e)}
            inputProps={{
              name: 'city',
              id: 'city',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value='Jakarta'>Jakarta</MenuItem>
            <MenuItem value='Bekasi'>Bekasi</MenuItem>
            <MenuItem value='Aceh'>Aceh</MenuItem>
            <MenuItem value='Surabaya'>Surabaya</MenuItem>
          </Select>
        </FormControl>
        <WeatherCard
          city={city}
          image={icon}
          suhu={suhu}
          wind={wind}
          date={date}
          title={title}
        />
      </Paper>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
})

export default connect(mapStateToProps)(App)
