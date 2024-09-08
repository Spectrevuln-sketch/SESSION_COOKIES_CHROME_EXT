import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import { GetTableData } from '../utils/api'
import DataTable from 'react-data-table-component';


interface ValueTaskType {
  Category: string,
  "Clock in": string,
  "Clock out": string,
  "Current entry": string,
  "Current duration": string,
  "Total today": string,
  Tracking?: string,
  Task: string
}

interface TaskType {
  id: string,
  data: string,
}

const App: React.FC<{}> = () => {
  const [ListTimeTracker, setListTimeTracker] = useState<any[]>([])
  const [TaskData, setTaskData] = useState<any[]>([])
  const [ListRow, setListRow] = useState<any[]>([])
  const [selectTask, setSelectTask] = useState<string>('')
  useEffect(() => {
    getTableData();

  }, [])

  const getTableData = () => {
    GetTableData().then(res => {
      let Task: TaskType[] = []
      const ListValue = res.map(data => Object.assign({}, {
        id: data.id,
        ...data.values
      }))
      setListRow(res)
      res.map(async (dataTracker, idx) => {
        const pattrenTask = new RegExp(`${dataTracker.values.Task}*`)
        if (Task.length > 0) {
          if (Task.filter(task => pattrenTask.test(task.data) === true).length > 0) {
            return
          } else {
            Task.push({
              id: dataTracker.id,
              data: dataTracker.values.Task
            })
          }
        } else {
          Task.push({
            id: dataTracker.id,
            data: dataTracker.values.Task
          })
        }
      })

      setListTimeTracker(ListValue.filter(timeTrack => timeTrack.Task.toUpperCase() !== 'PROTOTYPING'))
      setTaskData(Task.filter(task => task.data.toUpperCase() !== 'PROTOTYPING'))
      setSelectTask(Task.shift().data)
    }).catch(err => {
      console.log("Error:", err)
      return alert("Sedang Ada Gangguan Dari Coda Mohon Di Tunggu")
    })
  }
  console.log("==============ListRow==================", ListRow)
  const columns = [
    {
      name: 'Category',
      selector: row => row.Category,
    },
    {
      name: 'Task',
      selector: row => row.Task,
    },
    {
      name: 'Clock in',
      selector: row => {
        const ClockIn = JSON.parse(row["Clock in"])
        console.log(ClockIn.disabled)
        return (
          <ClockIn.formatType disabled={ClockIn.disabled} className={ClockIn.disabled ? "bg-slate-300 rounded-md p-2 font-semibold" : "bg-green-300 rounded-md p-2 font-semibold"}>Clock in</ClockIn.formatType>
        )
      },
    },
    {
      name: 'Clock out',
      selector: row => {
        const ClockOut = JSON.parse(row["Clock out"])
        return (
          <ClockOut.formatType disabled={ClockOut.disabled} className={ClockOut.disabled ? "bg-slate-300 rounded-md p-2 font-semibold" : "bg-red-300 rounded-md p-2 font-semibold"}>Clock Out</ClockOut.formatType>
        )
      },
    },
    {
      name: 'Total today',
      selector: row => row["Total today"],
    },
    {
      name: 'Current duration',
      selector: row => row["Current duration"],
    },
  ];



  return (
    <div className='flex flex-1 flex-col'>
      <Header title="Time Tracker Coda" />
      {/* content */}
      <div className='p-2'>

        <div className='flex flex-1 flex-row font-semibold justify-start items-center gap-2 outline-none'>
          <p>Choose Task : </p>
          {TaskData && TaskData.length > 0 && (
            <select className='bg-slate-300 p-1 rounded-md' onChange={(e) => setSelectTask(e.target.value)}>
              {TaskData.map((item, index) => (
                <option key={item.id} value={item.data}>{item.data}</option>
              ))}
            </select>
          )}
        </div>
        <DataTable
          columns={columns}
          data={ListTimeTracker.filter(timeTrack => new RegExp(`${selectTask}`).test(timeTrack.Task))}
          selectableRows={false}
        />
      </div>
    </div>
  )
}

export default App