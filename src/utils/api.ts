import { Coda } from 'coda-js'
const token = "f5150b84-0c23-46c6-a061-cde258e4099a";
const codaApi = new Coda(token);

export const whoamai = async (): Promise<any> => {
  const whoamai = await codaApi.whoAmI();
  return whoamai;
}

export const GetTableData = async (): Promise<any> => {
  const docRes = await fetch(`https://coda.io/apis/v1/docs?isOwner=false`);
  const DocsData = await docRes.json()
  console.log('DocsData', DocsData)
  const TablesRes = await fetch(`https://coda.io/apis/v1/docs/${DocsData.items?.[0].id}/tables`);
  const TableData = await TablesRes.json()
  console.log('TableData', TableData)
  const RowRes = await fetch(`https://coda.io/apis/v1/docs/${DocsData.items?.[0].id}/tables/grid-VAAAD2nWgS/rows?useColumnNames=true`);
  const TableRowsData = await RowRes.json()
  console.log('RowData', TableRowsData)
  return TableRowsData.items
}
