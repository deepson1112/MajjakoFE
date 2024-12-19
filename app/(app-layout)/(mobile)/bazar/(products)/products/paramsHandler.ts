export async function addParamsToCurrentUrl(
  params: { key: string; value: string | string[] }[]
): Promise<string> {
  const queryParams = params
    .map((param) => {
      if (Array.isArray(param.value)) {
        return param.value
          .map(
            (val) =>
              `${encodeURIComponent(param.key)}=${encodeURIComponent(val)}`
          )
          .join("&");
      } else {
        return `${encodeURIComponent(param.key)}=${encodeURIComponent(
          param.value
        )}`;
      }
    })
    .join("&");
  return queryParams;
}
