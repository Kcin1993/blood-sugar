/* eslint-disable no-restricted-globals */
import React from 'react';
import styled from 'styled-components';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import * as R from 'ramda';
import { Tab, Table, Button, Loader } from 'semantic-ui-react';

import DataPostModal from './components/dataPostModal';

import clientRequest from '../../utils/request/clientRequest';
import timeFormat from '../../utils/timeFormat/index';

const TableSmallHint = styled.small`
  font-size: 10.5px;
  color: rgba(55, 55, 55, 0.9);
`;

const AddRecordBtnWrap = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const TabContainer = styled.div`
  width: 100%;
`;

const TabWrap = styled.div`
  flex: 0 1 100%;
  padding: 0;
  overflow-x: scroll;
  .tab {
    min-width: 1350px;
    margin-right: 20px;
  }
`;

const HomeWrap = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(
    45deg,
    rgba(255, 87, 136, 1) 0%,
    rgba(125, 185, 232, 1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const panes = (records, deleteRec) => [
  {
    menuItem: '血糖紀錄',
    render: () => (
      <Tab.Pane>
        {R.equals(records, []) ? (
          <div style={{ padding: '50px 0' }}>
            <Loader active size="medium">
              載入中
            </Loader>
          </div>
        ) : (
          <Table celled fixed unstackable size="small" className="tableWrap">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>日期</Table.HeaderCell>
                <Table.HeaderCell>早餐測量</Table.HeaderCell>
                <Table.HeaderCell>血糖</Table.HeaderCell>
                <Table.HeaderCell>胰島素1</Table.HeaderCell>
                <Table.HeaderCell>胰島素2</Table.HeaderCell>
                <Table.HeaderCell>點心時間</Table.HeaderCell>
                <Table.HeaderCell>點心內容</Table.HeaderCell>
                <Table.HeaderCell>晚餐測量</Table.HeaderCell>
                <Table.HeaderCell>血糖</Table.HeaderCell>
                <Table.HeaderCell>胰島素3</Table.HeaderCell>
                <Table.HeaderCell>是否低血糖</Table.HeaderCell>
                <Table.HeaderCell>低血糖</Table.HeaderCell>
                <Table.HeaderCell>低血糖時間</Table.HeaderCell>
                <Table.HeaderCell>備註</Table.HeaderCell>
                <Table.HeaderCell>資料操作</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {records.map((rec, index) => (
                <Table.Row key={rec._id}>
                  <Table.Cell>{rec.date}</Table.Cell>
                  <Table.Cell>{rec.time_1}</Table.Cell>
                  <Table.Cell>{rec.bs_1}</Table.Cell>
                  <Table.Cell>
                    {rec.insulin_1}
                    {rec.adj_insulin_1 ? (
                      <TableSmallHint> ({rec.adj_insulin_1})</TableSmallHint>
                    ) : null}
                  </Table.Cell>
                  <Table.Cell>
                    {rec.insulin_2}
                    {rec.adj_insulin_2 ? (
                      <TableSmallHint> ({rec.adj_insulin_2})</TableSmallHint>
                    ) : null}
                  </Table.Cell>
                  <Table.Cell>{rec.time_2}</Table.Cell>
                  <Table.Cell>{rec.time_2_content}</Table.Cell>
                  <Table.Cell>{rec.time_3}</Table.Cell>
                  <Table.Cell>{rec.bs_2}</Table.Cell>
                  <Table.Cell>
                    {rec.insulin_3}
                    {rec.adj_insulin_3 ? (
                      <TableSmallHint> ({rec.adj_insulin_3})</TableSmallHint>
                    ) : null}
                  </Table.Cell>
                  <Table.Cell>
                    {R.equals(rec.low_bs, true) ? '是' : null}
                    {R.equals(rec.low_bs, false) ? '否' : null}
                  </Table.Cell>
                  <Table.Cell>{rec.bs_3}</Table.Cell>
                  <Table.Cell>{rec.time_4}</Table.Cell>
                  <Table.Cell>{rec.note}</Table.Cell>
                  <Table.Cell>
                    <DataPostModal createMode={false} rec={rec} />
                    <Button
                      negative
                      icon="delete"
                      size="mini"
                      onClick={() => deleteRec(rec._id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </Tab.Pane>
    )
  },
  {
    menuItem: '資料視覺化',
    render: () => (
      <Tab.Pane>
        <TabContainer>
          <i>開發中</i>
        </TabContainer>
      </Tab.Pane>
    )
  }
];

const Home = ({ records, deleteRec }) => (
  <HomeWrap>
    <TabWrap>
      <Tab menu={{ secondary: true }} panes={panes(records, deleteRec)} />
    </TabWrap>
    <AddRecordBtnWrap>
      <DataPostModal createMode={true} />
    </AddRecordBtnWrap>
  </HomeWrap>
);

export default compose(
  withState('records', 'recordsFN', []),
  withHandlers({
    deleteRec: () => id => {
      let c = confirm('確定刪除本筆資料？');
      if (c) {
        clientRequest()
          .get(`/delete/${id}`)
          .then(res => {
            window.location.href = '/';
          })
          .catch(err => {
            alert('刪除資料失敗');
          });
      } else {
        return false;
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      clientRequest()
        .get('/fetch')
        .then(res => {
          const data = () => {
            const getTime = obj => new Date(obj.date).getTime();
            return R.sort((a, b) => getTime(b) - getTime(a), res.data.payload);
          };
          this.props.recordsFN(res.data.payload);
        })
        .catch(err => {
          alert('資料庫連線失敗');
          console.log('[Console] Fetch err -> ', err);
        });
    }
  })
)(Home);
