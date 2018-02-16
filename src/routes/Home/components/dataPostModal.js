import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import styled from 'styled-components';
import { Button, Icon, Modal, Header } from 'semantic-ui-react';

import FormPost from './formPost';

const HeaderCloseBtnWrap = styled.div`
  color: white;
  positiion: relative;
  h3 {
    font-size: 24px;
    font-weight: normal;
  }
  .headerCloseBtn {
    position: absolute;
    right: 10px;
    top: 14px;
    background: none;
    margin: 0 !important;
    &:hover {
      background: none;
    }
    i {
      font-size: 20px;
      color: white;
    }
  }
`;

const DataPostModal = ({
  createMode,
  modalOpen,
  toggleModal,
  btnProcessStatus,
  rec
}) => (
  <Modal
    trigger={
      <Button
        primary
        icon={createMode ? 'add' : 'edit'}
        label={createMode ? '新增血糖紀錄' : null}
        onClick={() => toggleModal(true)}
        size="mini"
      />
    }
    basic
    size="small"
    open={modalOpen}
  >
    <Header
      children={
        <HeaderCloseBtnWrap>
          <h3>
            <Icon name={createMode ? 'add' : 'edit'} />
            {createMode ? '新增血糖紀錄' : `更新血糖紀錄`}
          </h3>
          <Button
            icon
            onClick={() => toggleModal(false)}
            className="headerCloseBtn"
          >
            <Icon name="close" />
          </Button>
        </HeaderCloseBtnWrap>
      }
    />
    <Modal.Content>
      <p>
        {createMode
          ? '新增一筆紀錄，下方欄位紅點為必填欄位。新增後可再繼續編輯'
          : '更新某日血糖紀錄'}
      </p>
      {/* Form component. Post data to server side */}
      <FormPost createMode={createMode} rec={rec} />
    </Modal.Content>
  </Modal>
);

export default compose(
  withState('modalOpen', 'modalOpenFN', false),
  withHandlers({
    toggleModal: ({ modalOpen, modalOpenFN }) => bool => {
      modalOpenFN(bool);
    }
  })
)(DataPostModal);

/**
 * Props describe
 * creatMode: Decide is post data or update data && decide the wording to be used
 */
