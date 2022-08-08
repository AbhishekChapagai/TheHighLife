import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axoisInstance, { headers } from "../../utils/sellerAxois";

const Seller = () => {
  const [users, setusers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axoisInstance
      .get("/seller/admin/getallUsers", {
        headers: headers,
      })
      .then((res) => {
        setusers(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });
  }, []);

  const verifyUser = (id) => {
    const obj = {
      sid: id,
    };
    axoisInstance
      .put(`/seller/verify/admin`, obj, {
        headers: headers,
      })
      .then((res) => {
        axoisInstance
          .get("/seller/admin/getallUsers", {
            headers: headers,
          })
          .then((res) => {
            console.log(res.data.message);
            setusers(res.data);
          })
          .catch((err) => {
            console.log(err?.response?.data?.message);
          });
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });
  };

  const searchUsers = (e) => {
    setQuery(e.target.value);
    if (!query) {
      return;
    }

    axoisInstance
      .get(`/seller/search/${e.target.value}`, {
        headers: headers,
      })
      .then((res) => {
        setusers(res.data);
        axoisInstance
        .get("/seller/admin/getallUsers", {
          headers: headers,
        })
        .then((res) => {
          console.log(res.data.message);
          setusers(res.data);
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
        });
        // setProduct(res.data);
      });
  };

  const deleteUser=(id)=>{
    axoisInstance.delete(`/seller/delete/${id}`,{
      headers: headers
    }).then(res=>{

      axoisInstance
      .get("/seller/admin/getallUsers", {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data.message);
        setusers(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });


      // setusers(res.data);
    }).catch(err=>{
      console.log(err?.response?.data?.message)
    })
  }

  return (
    <div>
      <input
        type="text"
        // className={classes.input}
        style={{ width: "80%", marginLeft: "10%", height: "25px" }}
        placeholder="Search Users by name"
        value={query}
        onChange={searchUsers}
      />
      <TableContainer component={Paper}>
        <Table
          //  className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Fullname </b>
              </TableCell>
              <TableCell>
                <b>Email </b>
              </TableCell>
              <TableCell>
                <b>Address </b>
              </TableCell>
              <TableCell>
                <b>Action </b>
              </TableCell>
              <TableCell>
                <b>Action </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.fullname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.address}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.verified ? (
                    "Verified"
                  ) : (
                    <Button
                      style={{
                        background: "#698362",
                        color: "white",
                        textTransform: "none",
                      }}
                      onClick={() => verifyUser(row._id)}
                    >
                      Verify
                    </Button>
                  )}
                </TableCell>

                <TableCell component="th" scope="row">
                
                    <Button
                      style={{
                        background: "#698362",
                        color: "white",
                        textTransform: "none",
                      }}
                      onClick={() => deleteUser(row._id)}
                    >
                      Delete
                    </Button>
               
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Seller;
