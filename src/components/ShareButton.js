import React from 'react';
import { WhatsappShareButton } from 'react-share';
import { Button } from 'react-bootstrap';

const ShareButton = ({ url, title}) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <WhatsappShareButton url={url} title={title}>
                <Button variant="success">Compartilhar no WhatsApp</Button>
            </WhatsappShareButton>
        </div>
    );
};

export default ShareButton;