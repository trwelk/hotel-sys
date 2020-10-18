// import { BorderColor } from '@material-ui/icons';
// import React from 'react';
// import {Bar} from 'react-chartjs-2'
// import { firestoreConnect, isLoaded } from 'react-redux-firebase';
// import { useSelector, connect } from 'react-redux';
// // import { Bar } from 'recharts';

// function BarChart () {
// //     const [state, setState] = React.useState({
// //         open: false,
// //         vertical: 'bottom',
// //         horizontal: 'right',
// //       });
// //       const { vertical, horizontal, open, error } = state;
// //     const feedbacks = useSelector(state => state.firestore.ordered.product)
// //   const datas = feedbacks ? (feedbacks.map(feedback => ({ ...feedback }))) : (null)
//     const data = {
//         // labels: [...datas.ProName,],
//         labels: ['rice','hooper','kott','name'],
//         datasets:[
//             {
//                 label: 'stock quantity',
//                 // data:[...datas.price],
//                 data:[3,5,6,7],
//                 borderColor:['rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)'],
//                 backgroundColor:['rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)'],
//                 // pointBackgroundColor:'rgba(255,206,86,0.2)',
//                 // pointBorderColor:'rgba(255,206,86,0.2)'
//             },
//             {
//                 label: 'sell quantity',
//                 data:[5,8,3,5],
//                 borderColor:['rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)'],
//                 backgroundColor:['rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)'],
//                 // pointBackgroundColor:'rgba(54,162,235,0.2)',
//                 // pointBorderColor:'rgba(54,162,235,0.2)'
//             }
//         ]
//     }
//     const options = {
//         title:{
//             display:true,
//             text:'bar chart'
//         },
//         scales:{
//             yAxes:[
//                 {
//                     ticks:{
//                         min:0,
//                         max:9,
//                         stepSize:1
//                     }
//                 }    
//             ]
//         }
//     }
//     return <Bar data={data} options={options}/>
// }

// export default BarChart

import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

function BarChart() {

    // const fnbInv = useSelector(state => state.firestore.ordered.inventoryProducts)
    // const Invdata = fnbInv ? (fnbInv.map(fnb_Inv => ({...fnb_Inv}))) : (null)
    const Stock = useSelector(state => state.firestore.ordered.barInventory)
    const AStock = Stock ? (Stock.map(Stocks => ({...Stocks}))) : (null)
 
        let labels = [];
        let data = [];
        let borderColor = [];
        let backgroundColor = [];
    
    if(AStock){
        // let  st = AStock.filter(Stocks => Stocks.date >);
        for (let index = 0; index < AStock.length; index++) {
            labels.push(AStock[index].itemName);
            data.push(AStock[index].qty); 
            borderColor.push('rgba(255,206,86,0.2)');
            backgroundColor.push('rgba(255,206,86,0.2)');
        }
    }
        const chartData = {
            labels:labels,
            datasets:[{
                label:'Bar Stock Analysis',
                data: data,
                borderColor:borderColor,
                backgroundColor:backgroundColor
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
    {collection: 'barInventory'}
  ])) (BarChart)

