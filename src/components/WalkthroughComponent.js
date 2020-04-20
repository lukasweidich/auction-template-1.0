import React from "react"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const comp = (props) => {
    const { title, subheader, src, text, ratio, maxWidth } = props;

    return (
        <Card style={{ maxWidth: maxWidth }}>
            <CardHeader
                title={title}
                subheader={subheader}
            />
            <CardMedia
                image={src}
                title={title}
                style={{
                    height: 0,
                    paddingTop: ratio
                }}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default comp;