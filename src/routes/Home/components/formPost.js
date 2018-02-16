import React from 'react';
import { Button, Form, Divider, Radio } from 'semantic-ui-react';
import styled from 'styled-components';
import { compose, withState, withHandlers, lifecycle } from 'recompose';

import clientRequest from '../../../utils/request/clientRequest';
import dateFormat from '../../../utils/constants/dateFormat';

const FormPostWrap = styled.div`
  .field > div {
    position: relative;
    .timePicker {
      width: 100% !important;
    }
  }
  .timePickerPop {
    .react-datepicker__time-list {
      padding: 0 !important;
      text-align: center;
    }
  }
`;

const FormPost = ({ createMode, rec, data, fieldOnChange, dataSubmit }) => (
  <FormPostWrap>
    <Form inverted onSubmit={dataSubmit}>
      <Form.Field>
        <label>資料日期</label>
        <input
          name="date"
          type="date"
          onChange={event => fieldOnChange('date', event.target.value)}
          value={data.date}
        />
      </Form.Field>

      <Divider horizontal inverted>
        上午時段
      </Divider>
      <Form.Group widths="equal">
        <Form.Field>
          <label>早餐測量時間</label>
          <input
            name="time_1"
            type="time"
            onChange={event => fieldOnChange('time_1', event.target.value)}
            value={data.time_1}
          />
        </Form.Field>
        <Form.Field>
          <label>早餐血糖指數</label>
          <input
            name="bs_1"
            type="text"
            onChange={event => fieldOnChange('bs_1', event.target.value)}
            value={data.bs_1}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label>胰島素1</label>
          <input
            name="insulin_1"
            type="text"
            onChange={event => fieldOnChange('insulin_1', event.target.value)}
            value={data.insulin_1}
          />
        </Form.Field>
        <Form.Field>
          <label>微調值(胰島素1)</label>
          <input
            name="adj_insulin_1"
            type="text"
            onChange={event =>
              fieldOnChange('adj_insulin_1', event.target.value)
            }
            value={data.adj_insulin_1}
          />
        </Form.Field>
        <Form.Field>
          <label>胰島素2</label>
          <input
            name="insulin_2"
            type="text"
            onChange={event => fieldOnChange('insulin_2', event.target.value)}
            value={data.insulin_2}
          />
        </Form.Field>
        <Form.Field>
          <label>微調值(胰島素2)</label>
          <input
            name="adj_insulin_2"
            type="text"
            onChange={event =>
              fieldOnChange('adj_insulin_2', event.target.value)
            }
            value={data.adj_insulin_2}
          />
        </Form.Field>
      </Form.Group>

      <Divider horizontal inverted>
        點心時段
      </Divider>
      <Form.Group widths="equal">
        <Form.Field>
          <label>點心時間</label>
          <input
            name="time_2"
            type="time"
            onChange={event => fieldOnChange('time_2', event.target.value)}
            value={data.time_2}
          />
        </Form.Field>
        <Form.Field>
          <label>下午點心內容</label>
          <input
            name="time_2_content"
            placeholder=""
            type="text"
            onChange={event =>
              fieldOnChange('time_2_content', event.target.value)
            }
            value={data.time_2_content}
          />
        </Form.Field>
      </Form.Group>

      <Divider horizontal inverted>
        晚上時段
      </Divider>
      <Form.Group widths="equal">
        <Form.Field>
          <label>晚餐測量時間</label>
          <input
            name="time_3"
            type="time"
            onChange={event => fieldOnChange('time_3', event.target.value)}
            value={data.time_3}
          />
        </Form.Field>
        <Form.Field>
          <label>晚餐血糖指數</label>
          <input
            name="bs_2"
            type="text"
            onChange={event => fieldOnChange('bs_2', event.target.value)}
            value={data.bs_2}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width={4}>
          <label>胰島素3</label>
          <input
            name="insulin_3"
            type="text"
            onChange={event => fieldOnChange('insulin_3', event.target.value)}
            value={data.insulin_3}
          />
        </Form.Field>
        <Form.Field width={4}>
          <label>微調值(胰島素3)</label>
          <input
            name="adj_insulin_3"
            type="text"
            onChange={event =>
              fieldOnChange('adj_insulin_3', event.target.value)
            }
            value={data.adj_insulin_3}
          />
        </Form.Field>
      </Form.Group>

      <Divider horizontal inverted>
        低血糖與備註
      </Divider>
      <Form.Group inline>
        <label>今日是否發生低血糖</label>
        <Form.Field
          width={2}
          label="否"
          control={Radio}
          checked={data.low_bs === false}
          onChange={() => fieldOnChange('low_bs', false)}
          value={data.low_bs}
        />
        <Form.Field
          width={2}
          label="是"
          control={Radio}
          checked={data.low_bs === true}
          onChange={() => fieldOnChange('low_bs', true)}
          value={data.low_bs}
        />
      </Form.Group>

      {/* decide to render to low_bs detail fields */}
      {data.low_bs ? (
        <Form.Group widths="equal">
          <Form.Field>
            <label>低血糖時間</label>
            <input
              name="time_4"
              type="time"
              onChange={event => fieldOnChange('time_4', event.target.value)}
              value={data.time_4}
            />
          </Form.Field>
          <Form.Field>
            <label>低血糖指數</label>
            <input
              name="bs_3"
              type="text"
              onChange={event => fieldOnChange('bs_3', event.target.value)}
              value={data.bs_3}
            />
          </Form.Field>
        </Form.Group>
      ) : null}
      <Form.Field>
        <label>其他備註</label>
        <input
          name="note"
          type="text"
          onChange={event => fieldOnChange('note', event.target.value)}
          value={data.note}
        />
      </Form.Field>

      <Button type="submit" positive>
        {createMode ? '新增血糖紀錄' : '更新'}
      </Button>
    </Form>
  </FormPostWrap>
);

export default compose(
  withState('data', 'dataFN', ({ rec }) => (rec ? rec : {})),
  withHandlers({
    fieldOnChange: ({ dataFN, data }) => (key, value) => {
      dataFN(Object.assign(data, { [key]: value }));
    },
    dataSubmit: ({ data, createMode }) => () => {
      if (createMode) {
        clientRequest()
          .post('/create', data)
          .then(res => {
            window.location.href = '/';
          })
          .catch(err => {
            console.log('[Console] Create blood sugar rec fail');
          });
      } else {
        const id = data._id;
        clientRequest()
          .post(`/update/${id}`, data)
          .then(res => {
            window.location.href = '/';
          })
          .catch(err => {
            alert('本次資料更新失敗');
          });
      }
    }
  })
)(FormPost);
