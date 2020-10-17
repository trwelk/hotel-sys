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
        let inv = Invdata.filter(fnb_Inv => (new Date(fnb_Inv.expDate) > new Date()));
        for (let index = 0; index < inv.length; index++) {
            labels.push(inv[index].itemName);
            data.push(inv[index].qty);
        }
    }
        const chartData = {
            labels:labels,
            datasets:[{
                label:'Stock Analysis(Kgs/Pkts/Cans)',
                data: data,
            }]
        }
        return(
            <div className="chart" id="barChart">
                <Bar
                    data={chartData}
                    width={150}
                    height={50}
                    fontSize='24px'
                    options={
                        {scales: {
                              yAxes: [{
                                ticks: {
                                  beginAtZero: true
                                }
                              }]                              
                            }
                          }}/>
            </div>
        )

}

  export default compose(connect(null,null),firestoreConnect([
    {collection: 'fnbInventory'}
  ])) (InventoryChart)

