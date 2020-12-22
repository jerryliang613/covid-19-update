import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import { useEffect, useState } from 'react';
import _ from 'lodash';
import './css/App.css';
import Infobox from './components/Infobox';
import Map from './components/Map'
import Table from './components/Table';
import Linegraph from './components/Linegraph';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedcountry, setSelectedCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    column: 'cases',
    isAscend: false
  });
  const [mapCenter, setMapCenter] = useState([-27, 133]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => setCountryInfo(data))
      .catch()
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag
          }));
          setCountries(countries);
          setTableData(_.orderBy(data, [sortColumn.column], [sortColumn.isAscend ? 'asc' : 'desc']));
          setMapCountries(data)
        })
        .catch(ex => console.log(ex.message))
    };

    getCountriesData();
  }, [])

  const handleChange = async ({ target }) => {
    setSelectedCountry(target.value);
    const url = target.value === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : 'https://disease.sh/v3/covid-19/countries/' + target.value;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(3);
      })
      .catch()
  }

  const handleSort = column => {
    const sortorder = column === sortColumn.column ? !sortColumn.isAscend : true;
    setSortColumn({
      isAscend: sortorder,
      column
    });

    const newdata = _.orderBy(tableData, [column], [sortorder ? 'asc' : 'desc']);
    setTableData(newdata);
  }
  return (
    <div className="App">
      <div className="app_left">
        <div className="header">
          <h1>COVID-19 UPDATE</h1>
          <FormControl className='app_dropdown'>
            <Select
              variant='outlined'
              value={selectedcountry}
              onChange={handleChange}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map(country => <MenuItem
                  key={country.name}
                  value={country.value}
                ><img style={{ marginRight: '5px', width: '20px' }} src={country.flag} alt={country.name} />{country.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <Infobox title='Coronavirus Cases' cases={countryInfo.todayCases}
            total={countryInfo.cases}
            date={new Date(countryInfo.updated).toDateString()} />
          <Infobox title='Recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            date={new Date(countryInfo.updated).toDateString()} />
          <Infobox title='Deaths'
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            date={new Date(countryInfo.updated).toDateString()} />
        </div>
        {/* Map */}
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table
            countries={tableData}
            sortColumn={sortColumn}
            onClick={handleSort}
          />
          <h3>Worldwide New Cases</h3>
          <Linegraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
