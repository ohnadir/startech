import React from 'react';
import { Helmet } from 'react-helmet'

const SEO = ({title}) => {
    return (
        <Helmet>
            <title> {`${title} - Star tech`}</title>
        </Helmet>
    );
};

export default SEO;