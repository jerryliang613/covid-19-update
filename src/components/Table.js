import numeral from 'numeral';
import DetailsIcon from '@material-ui/icons/Details';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';

const Table = ({ countries, sortColumn, onClick }) => {

    return (
        <div className='table'>
            <tr>
                <th onClick={() => onClick('country')}><span>Country
                {sortColumn.column === 'country' && (sortColumn.isAscend
                        ? <ChangeHistoryIcon className='sorticon' />
                        : <DetailsIcon className='sorticon' />
                    )}</span></th>
                <th onClick={() => onClick('cases')}><span>Cases {sortColumn.column === 'cases' && (sortColumn.isAscend
                    ? <ChangeHistoryIcon className='sorticon' />
                    : <DetailsIcon className='sorticon' />
                )}</span></th>
            </tr>
            {
                countries.map(({ country, cases }) => (
                    <tr>
                        <td>{country}</td>
                        <td>{numeral(cases).format('0,0')}</td>
                    </tr>
                ))
            }
        </div>
    );
}

export default Table;