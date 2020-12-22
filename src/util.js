import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

const caseTypeColors = {
    cases: {
        hex: '#cc1034',
        multiplier: 800,

    },
    recovered: {
        hex: '#7dd71d',
        multiplier: 1200,
    },
    deaths: {
        hex: '#fb4443',
        multiplier: 2000,
    }
}

export const showDataOnMap = (data, caseType = 'cases') => data.map(country =>
    <Circle
        key={country.country}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={caseTypeColors[caseType].hex}
        fillColor={
            caseTypeColors[caseType].hex
        }
        radius={
            Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
        }
    >
        <Popup key={country.country}>
            <h4>{country.country}</h4>
            <span>{new Date(country.updated).toDateString()}</span>
            <h4>{numeral(country.todayCases).format('0,0')}</h4>
            <span>{numeral(country.cases).format('0,0')}<span> Total</span></span>
        </Popup>
    </Circle>
)
