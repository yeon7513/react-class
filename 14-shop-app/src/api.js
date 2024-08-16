import axios from 'axios';
import {
  parseFirestoreFields,
  toFirestoreFields,
} from './utils/firebaseTranslate';

const BASE_URL =
  'https://firestore.googleapis.com/v1/projects/mbti-project-495d0/databases/(default)/documents';

const API_KEY = 'AIzaSyC8Wq1wiK7nma--7EYpVy6X5iW_qsJC_rk';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

function getResultData(response) {
  if (response.data.length > 0) {
    const result = response.data.map((data) => {
      return {
        ...parseFirestoreFields(data.document.fields),
        docId: data.document.name.split('/').pop(),
      };
    });
    return result;
  } else {
    return {
      ...parseFirestoreFields(response.data.fields),
      docId: response.data.name.split('/').pop(),
    };
  }
}

export async function getDatasRest(collectionName, queryOptions) {
  const { conditions, orders } = queryOptions;
  const [condition] = conditions;
  const { field, operator, value } = condition;
  const [order] = orders;
  const { orderField, direction } = order;

  try {
    const response = await api.post(':runQuery', {
      structuredQuery: {
        from: [{ collectionId: collectionName }],
        where: {
          fieldFilter: {
            field: { fieldPath: field },
            op: operator,
            value: { stringValue: value },
          },
        },
        orderBy: [
          {
            field: { fieldPath: orderField },
            direction: direction,
          },
        ],
      },
    });
    return getResultData(response);
  } catch (error) {
    console.error('데이터 가져오기 오류: ', error);
  }
}

export async function getDataRest(url) {
  const response = await api.get(url);
  return getResultData(response);
}

export async function addDatasRest(url, addObj) {
  try {
    await api.patch(url, { fields: toFirestoreFields(addObj) });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteDatasRest(url) {
  await api.delete(url);
  return true;
}

export async function deleteDatasRestBatch(url, dataArr) {
  try {
    const requests = dataArr.map((item) => {
      return {
        writes: {
          delete: `projects/mbti-project-495d0/databases/(default)/documents/${url}/${item.id}`,
        },
      };
    });

    const response = await api.post(
      ':batchWrite',
      { requests },
      { params: { key: API_KEY } }
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
