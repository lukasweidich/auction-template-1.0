import React from "react"
import { Link } from "react-router-dom"

const { Paper, Grid, Button, Typography } = require('@material-ui/core');

const TemplatePreview = props => {

    const price = parseFloat(props.price) > 0 ? `${props.price} ${props.currency}` : "kostenlos";

    return (
        <div style={{ backgroundColor: "#e6e6e6" }}>
            <Paper
                style={{
                    margin: "auto",
                    maxWidth: 800,
                }}>
                <Grid container spacing={2}>
                    <Grid item style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <img style={{
                            marginLeft: '1em',
                            display: 'block',
                            maxWidth: '256px',
                            maxHeight: '256px'
                        }}
                            alt={props.image.alt} src={props.image.src} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} style={{ margin: "1em" }} >
                            <Grid item xs>
                                <Typography gutterBottom style={{ fontWeight: "700" }} variant="subtitle1">
                                    {props.text.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {props.text.text}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button color="primary" variant="contained" href={`/Template/${props.id}`}>Zur Auktionsvorlage</Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography style={{ margin: "1em" }} variant="subtitle1">{price}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default TemplatePreview;