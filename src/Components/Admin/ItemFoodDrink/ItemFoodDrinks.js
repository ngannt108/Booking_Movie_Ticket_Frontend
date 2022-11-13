import List from 'react-content-loader'
import EditFDModal from "../EditFDModal/EditFDModal";
const ItemFoodDrink = ({ index, fooddrinks }) => {
    // console.log(">> data", itemData)
    // return (
    //     <div>;sss</div>
    // )
    // {
    //     isScrolling ?
    //         <List />
    //         :
    return (
        <tr key={index}>
            <td className="organisationname number">{index + 1}</td>
            <td width="250px" className="organisationname">
                {fooddrinks.tenCombo}
            </td>
            <td className="organisationname image">
                <img height="80px" width="60px" src={fooddrinks.hinhAnh} alt="" />
            </td>
            <td width="900px">
                <div className="organisationname-description">
                    {fooddrinks.moTa}
                </div>
            </td>
            <td width="250px" className="actions">
                <EditFDModal biDanh={fooddrinks.biDanh} show={false} />
            </td>
        </tr>
    )
    // }
}

export default ItemFoodDrink;
