import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, Overlay, ModalContainer, ModalContent, CloseBtn } from './CommonModal.style';

interface Props {
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	children: React.ReactNode;
}

function CommonModal({ setIsOpenModal, children }: Props) {
	return (
		<Modal>
			<Overlay />
			<ModalContainer>
				<CloseBtn title="close" onClick={() => setIsOpenModal(false)}>
					<FontAwesomeIcon icon={faTimes} />
				</CloseBtn>
				<ModalContent>{children}</ModalContent>
			</ModalContainer>
		</Modal>
	);
}

export default CommonModal;
