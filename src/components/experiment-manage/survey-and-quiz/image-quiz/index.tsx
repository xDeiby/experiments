import * as React from 'react';
import { IImageModel, ISection } from '../../../../model/experiment';
import ModalImage from '../../../modals/modal-create/ModalImage';
import ImageQuizView from './ImageQuizView';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

export interface IImageQuizProps {
    quiz: ISection;
    image?: IImageModel;
}

export default function ImageQuiz({ quiz, image }: IImageQuizProps) {
    return !image ? (
        <div
            style={{
                padding: '15px',
                boxSizing: 'content-box',
                marginBottom: '20px',
                borderRadius: '15px',
                WebkitBoxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                boxShadow: '5px 5px 10px 1px rgba(0,0,0,0.5)',
                color: '#8591D0',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <ModalImage
                quiz={quiz}
                buttonName="Agregar Imagen"
                icon={<AddPhotoAlternateIcon />}
            />
        </div>
    ) : (
        <ImageQuizView image={image} />
    );
}
