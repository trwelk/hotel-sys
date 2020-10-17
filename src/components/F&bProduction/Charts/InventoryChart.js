import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

function InventoryChart() {

    const fnbInv = useSelector(state => state.firestore.ordered.fnbInventory)
    const Invdata = fnbInv ? (fnbInv.map(fnb_Inv => ({...fnb_Inv}))) : (null)
 
        let labels = [];
        let data = [];
    
    if(Invdata){
        let inv = Invdata.filter(fnb_Inv => fnb_Inv.stkStatus != "1");
        for (let index = 0; index < inv.length; index++) {
            labels.push(inv[index].itemName);
            data.push(inv[index].qty);
        }
    }
        const chartData = {
            labels:labels,
            datasets:[{
                label:'Stock Analysis',
                data: data,
            }]
        }
        return(
            <div className="chart" id="barChart">
                <Bar
                    data={chartData}
                    width={100}
                    height={200}
                    options={{
                    maintainAspectRatio: false}}/>
            </div>
        )

}

  export default compose(connect(null,null),firestoreConnect([
    {collection: 'fnbInventory'}
  ])) (InventoryChart)

