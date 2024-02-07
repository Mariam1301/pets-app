import { isDayjs } from "dayjs";
import moment from "moment";

export default function objectToQueryParams(obj) {
  const params = new URLSearchParams();

  function handleArray(field, fieldValue) {
    fieldValue.forEach((elemValue, index) => {
      if (elemValue == null) return;

      if (typeof elemValue === "object") {
        for (const prop in elemValue) {
          const propValue = resolveParamValue(elemValue[prop]);
          params.append(`${field}[${index}].${prop}`, propValue);
        }
      } else {
        params.append(`${field}[${index}]`, elemValue);
      }
    });
  }

  function handleObject(field, fieldValue) {
    for (const prop in fieldValue) {
      const propValue = resolveParamValue(fieldValue[prop]);
      params.append(`${field}.${prop}`, propValue);
    }
  }

  for (const field in obj) {
    const fieldValue = obj[field];

    if (fieldValue == null) continue;

    if (Array.isArray(fieldValue)) {
      handleArray(field, fieldValue);
    } else if (isDayjs(fieldValue)) {
      params.append(field, fieldValue.toISOString());
    } else if (moment.isMoment(fieldValue) || fieldValue instanceof Date) {
      params.append(field, moment(fieldValue).format());
    } else if (typeof fieldValue === "object") {
      handleObject(field, fieldValue);
    } else {
      params.append(field, obj[field]);
    }
  }

  return params.toString();
}

function resolveParamValue(value) {
  if (isDayjs(value)) {
    return value.toISOString();
  } else if (moment.isMoment(value)) {
    return value.format();
  }

  return value;
}
