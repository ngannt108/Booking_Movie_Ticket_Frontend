import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_MOVIE } from "../../../common/ApiController";
import "./Menu.css";
import "./MovieManage.css";
import { Button } from "../../../Components/Button/Button";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { FixedSizeList } from 'react-window';
import { List } from "react-content-loader";
import ItemMovie from "../../../Components/Admin/ItemMovie/ItemMovie";
import ReactTable, { usePagination, useTable } from "react-table";
import EditMovieModal from "../../../Components/Admin/EditMovieModal/EditMovieModal";
export default function AllMoviesTest() {
  const store = useContext(StoreContext);
  const [biDanh, setBiDanh] = useState();
  const [isComing, setIsComing] = useState(false);

  useEffect(() => {
    if (isComing) {
      //let data = store.lsShowingMovie.ShowingMovie.lsShowingMovie
      fetch(API_MOVIE.COMING)
        .then((res) => res.json())
        .then((dt) => {
          store.lsComingMovie.ComingMovieDispatch({
            type: "GETCOMINGMOVIES",
            payload: dt.data,
          });
        });
    } else {
      fetch(API_MOVIE.SHOWING)
        .then((res) => res.json())
        .then((dt) => {
          store.lsShowingMovie.ShowingMovieDispatch({
            type: "GETSHOWINGMOVIES",
            payload: dt.data,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComing]);

  let movies = isComing
    ? store.lsComingMovie.ComingMovie?.listMovie
    : store.lsShowingMovie.ShowingMovie?.listMovie;
  // console.log(">> MOVIES in test", movies);
  let data;
  data = movies;
  const columns = React.useMemo(
    () => [
      {
        Header: "Ten phim",
        accessor: "tenPhim", // accessor is the "key" in the data
        Cell: ({ value }) => (
          <td width="250px" className="organisationname">
            {value}
          </td>
        ),
      },
      {
        Header: "Hinh anh",
        accessor: "hinhAnh",
        Cell: ({ value }) => <img height="80px" width="60px" src={value} />,
      },
      {
        Header: "Mo ta",
        accessor: "moTa",
        Cell: ({ value }) => (
          <td width="900px">
            <div className="organisationname-description">{value}</div>
          </td>
        ),
      },
      {
        Header: "",
        accessor: "biDanh",
        Cell: ({ value }) => (
          <td width="250px" className="actions">
            <EditMovieModal biDanh={value} show={false} />
          </td>
        ),
      },
    ],
    []
  );

  // const tableHooks = (hooks) => {
  //   hooks.visibleColumns.push((columns) => [
  //     ...columns,
  //     {
  //       Cell: ({ row }) => (
  //         <td width="250px" className="actions">
  //           <EditMovieModal biDanh={"black-adam"} show={false} />
  //         </td>
  //       ),
  //     },
  //   ]);
  // };
  function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      footerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageSize: 6 },
      },
      usePagination
      // tableHooks
    );

    // Render the UI for your table
    return (
      <>
        <div>
          <div className="container-body">
            <table
              {...getTableProps()}
              border={1}
              style={{
                backgroundColor: "white",
                borderCollapse: "collapse",
                width: "100%",
              }}
            >
              <thead>
                {headerGroups.map((group) => (
                  <tr {...group.getHeaderGroupProps()}>
                    {group.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>{" "}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>{" "}
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageCount}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "100px" }}
                />
              </span>{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[2, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (movies) {
    return <Table columns={columns} data={data} />;
  } else {
    return (
      // <div style={{ padding: "48px" }}>
      <List style={{ padding: "48px", width: "925px" }} />
      //</div>
    );
  }

  //   if (movies) {
  //     return (
  //       <div>
  //         <ReactTable
  //           data={movies}
  //           columns={[
  //             {
  //               Header: "Tên phim",
  //               columns: [
  //                 {
  //                   id: "tenPhim",
  //                   Header: "Tên phim",
  //                 },
  //               ],
  //             },
  //             {
  //               Header: "Mô tả",
  //               columns: [
  //                 {
  //                   Header: "moTa",
  //                   accessor: "moTa",
  //                 },
  //               ],
  //             },
  //           ]}
  //           // onFilteredChange={(filtered) => this.setState({ filtered })}
  //           defaultPageSize={20}
  //           className="-striped -highlight"
  //         />
  //       </div>
  //     );
  //     // return (
  //     //   <>
  //     //     <div>
  //     //       <div style={{ padding: "0em 3em 3em 3em" }}>
  //     //         <div className="row">
  //     //           <div className="col-md-4">
  //     //             <Button
  //     //               disabled={isComing ? true : false}
  //     //               width="160px"
  //     //               height="40px"
  //     //               name="Phim sắp chiếu"
  //     //               onClick={() => setIsComing(true)}
  //     //             />
  //     //           </div>
  //     //           <div className="col-md-4">
  //     //             <Button
  //     //               disabled={!isComing ? true : false}
  //     //               width="160px"
  //     //               height="40px"
  //     //               name="Phim đang chiếu"
  //     //               onClick={() => setIsComing(false)}
  //     //             />
  //     //           </div>
  //     //         </div>
  //     //         {movies.length == 0 ? (
  //     //           <div
  //     //             style={{ color: "white", marginTop: "1em", minWidth: "925px" }}
  //     //           >
  //     //             Hiện chưa có thông tin phim!
  //     //           </div>
  //     //         ) : (
  //     //           <div className="container-body">
  //     //             <table className="layout display responsive-table">
  //     //               <thead>
  //     //                 <tr>
  //     //                   <th>Số thứ tự</th>
  //     //                   <th>Tên phim</th>
  //     //                   <th>Hình ảnh</th>
  //     //                   <th colSpan={2}>Mô tả</th>
  //     //                 </tr>
  //     //               </thead>
  //     //               <tbody>
  //     //                 {movies.map((item, index) => (
  //     //                   <ItemMovie movie={item} index={index} />
  //     //                 ))}
  //     //               </tbody>
  //     //             </table>
  //     //           </div>
  //     //         )}
  //     //       </div>
  //     //     </div>
  //     //   </>
  //     // );
  //   } else {
  //     return (
  //       // <div style={{ padding: "48px" }}>
  //       <List style={{ padding: "48px", width: "925px" }} />
  //       //</div>
  //     );
  //   }
}
