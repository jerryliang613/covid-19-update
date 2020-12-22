import numeral from 'numeral';
import { Card, CardContent, Typography } from '@material-ui/core';

const Infobox = ({ title, cases, total, date }) => {
    return (
        <Card className="infobox">
            <CardContent>
                <Typography
                    className='infobox_title'
                    color='textSecondary'>
                    <h4>{date}</h4>
                    {title}
                </Typography>
                <h2 className='infobox_cases'>{numeral(cases).format('0,0')}</h2>
                <Typography
                    className='infobox_total'
                    color='textSecondary'>
                    {numeral(total).format('0,0')}<span> Total</span>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Infobox;