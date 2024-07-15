import { getXmlToJson } from '../utils/getXmlToJson';

const SERVICE_KEY =
  '%2BUjyuVkbInMr7Tkmumw5Lb87wtQ1ndK3qPSUaX7TRXySfHboo8MS5A%2BLHgjHzfD5K0BAYcDcu1wIQv2t1HQxGw%3D%3D';

function getFormattedDate() {
  const offset = 1000 * 60 * 60 * 9;
  const today = new Date(new Date().getTime() + offset);
  const ISOString = today.toISOString();
  const formattedDate = ISOString.split('T')[0].split('-').join('');

  return formattedDate;
}

async function getSunsetRiseData() {
  const url =
    'http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo';

  const reqURL = `${url}?serviceKey=${SERVICE_KEY}&locdate=${getFormattedDate()}&location=대전`;

  const result = await fetch(reqURL);
  const textResult = await result.text();

  let xmlString = new DOMParser().parseFromString(textResult, 'text/xml');
  const jsonResult = getXmlToJson(xmlString).response.body.items.item;

  return jsonResult;
}

export { getSunsetRiseData };
